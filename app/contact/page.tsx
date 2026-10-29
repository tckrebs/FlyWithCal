import { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <h1 className="font-display-header text-5xl md:text-7xl leading-tight">
        Contact
      </h1>
      <div className="mt-12">
        <ContactForm />
      </div>
    </section>
  );
}
