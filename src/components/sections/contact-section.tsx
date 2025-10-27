
"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
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

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {label}
    </Button>
  );
}

export function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const contactFormSchema = z.object({
    name: z.string().min(1, t("form_error_name_required")),
    email: z.string().email(t("form_error_email_invalid")),
    message: z.string().min(1, t("form_error_message_required")),
  });

  type ContactFormValues = z.infer<typeof contactFormSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const initialState: FormState = {
    message: "",
    status: "idle",
  };

  const [state, formAction] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.status === "success") {
      toast({
        title: t("contact_submit_success_title"),
        description: t("contact_submit_success_desc"),
        variant: "default",
      });
      form.reset();
    } else if (state.status === "error") {
      toast({
        title: t("contact_submit_error_title"),
        description: state.message || t("contact_submit_error_desc"),
        variant: "destructive",
      });
    }
  }, [state, t, toast, form]);

  return (
    <section id="contact">
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form action={formAction} className="space-y-6">
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
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contact_message_label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("contact_message_placeholder")}
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <SubmitButton label={t("contact_submit_button")} />
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
