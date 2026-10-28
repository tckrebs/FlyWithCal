import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="py-16">
      <h1 className="font-display-header text-5xl md:text-7xl leading-tight">
        About
      </h1>
    </section>
  );
}
