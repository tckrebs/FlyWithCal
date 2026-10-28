import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-16">
      <h1 className="font-display text-5xl md:text-7xl leading-tight">Contact</h1>
    </section>
  );
}
