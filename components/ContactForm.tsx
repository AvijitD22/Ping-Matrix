"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h2 className="text-4xl font-bold mb-8">We’re Here to Help</h2>
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-8 shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Name + Email */}
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                  <Input
                    id="contact-name"
                    name="name"
                    placeholder="Your Full Name"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="You@Example.com"
                    required
                  />
                  <FieldDescription>
                    We will use this email to respond to your message.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            {/* Message */}
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Write your message here..."
                    className="resize-none min-h-[120px]"
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            {/* Consent */}
            <FieldSet>
              <FieldGroup>
                <Field orientation="horizontal" className="items-start gap-3">
                  <Checkbox id="contact-consent" name="consent" required />
                  <FieldLabel
                    htmlFor="contact-consent"
                    className="font-normal leading-snug"
                  >
                    I understand that this message will be shared with the
                    website administrator.
                  </FieldLabel>
                </Field>
              </FieldGroup>
            </FieldSet>

            {/* Submit */}
            <Field orientation="horizontal">
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
