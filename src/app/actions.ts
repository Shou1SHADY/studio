"use server";

import { z } from "zod";
import { analyzeContactFormSubmission } from "@/ai/flows/analyze-contact-form-sentiment";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { generateProductIdea, type GenerateProductIdeaOutput } from "@/ai/flows/generate-product-idea";
import { GenerateProductIdeaInputSchema } from "@/lib/schemas";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type FormState = {
  message: string;
  status: "success" | "error" | "idle";
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const parsed = contactFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!parsed.success) {
      return {
        message: parsed.error.errors.map((e) => e.message).join(", "),
        status: "error",
      };
    }
    
    const { name, email, message } = parsed.data;

    // 1. Analyze sentiment using GenAI
    const sentimentAnalysis = await analyzeContactFormSubmission({ message });
    
    console.log("Sentiment Analysis Result:", sentimentAnalysis);

    if (sentimentAnalysis.isNegative) {
      // In a real app, you might send an email, a Slack notification, or create a high-priority ticket.
      console.warn("Negative sentiment detected in contact form submission from", email);
    }
    
    // 2. Save to Firestore (ensure you have set up your Firebase config and Firestore rules)
    try {
      await addDoc(collection(db, "submissions"), {
        name,
        email,
        message,
        sentiment: sentimentAnalysis.sentiment,
        isNegative: sentimentAnalysis.isNegative,
        submittedAt: serverTimestamp(),
      });
    } catch (error) {
       console.error("Firebase Error: Failed to write document: ", error);
       // We can still return a success to the user and handle the DB error internally
    }

    return {
      message: "Submission successful!",
      status: "success",
    };
  } catch (e) {
    console.error(e);
    return {
      message: "An unexpected error occurred. Please try again.",
      status: "error",
    };
  }
}

export type IdeaGeneratorState = {
  data: GenerateProductIdeaOutput | null;
  message: string;
  status: "success" | "error" | "idle" | "pending";
};

export async function generateProductIdeaAction(
  prevState: IdeaGeneratorState,
  formData: FormData
): Promise<IdeaGeneratorState> {
    const parsed = GenerateProductIdeaInputSchema.safeParse({
      description: formData.get("description"),
    });

    if (!parsed.success) {
      return {
        data: null,
        message: parsed.error.errors.map((e) => e.message).join(", "),
        status: "error",
      };
    }

    try {
      const result = await generateProductIdea(parsed.data);
      return {
        data: result,
        message: "Idea generated successfully!",
        status: "success",
      };
    } catch (e) {
      console.error(e);
      return {
        data: null,
        message: "An AI error occurred. Please try again.",
        status: "error",
      };
    }
}
