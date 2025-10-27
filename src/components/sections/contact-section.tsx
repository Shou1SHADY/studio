"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm, type FormState } from "@/app/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {label}
    </Button>
  );
}

export function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const initialState: FormState = {
    message: "",
    status: "idle",
  };

  const [state, formAction] = useFormState(submitContactForm, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: t("contact_submit_success"),
        description: "We'll get back to you shortly.",
        variant: "default",
      });
      form.reset();
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: state.message || t("contact_submit_error"),
        variant: "destructive",
      });
    }
  }, [state, t, toast, form]);

  return (
    <section id="contact">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t("contact_title")}
        </h2>
        <p className="mt-4 text-muted-foreground md:text-lg">
          {t("contact_subtitle")}
        </p>
      </div>
      <div className="mt-12 max-w-4xl mx-auto">
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact_name_label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contact_name_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("contact_email_label")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("contact_email_placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contact_message_label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("contact_message_placeholder")}
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
               <SubmitButton label={t('contact_submit_button')} />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
