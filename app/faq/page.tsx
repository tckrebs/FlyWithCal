import { Metadata } from "next";
import { Faq, FaqList } from "../components/FaqList";

export const metadata: Metadata = {
  title: "FAQ",
  alternates: { canonical: "/faq" },
};

// TODO: Replace the placeholder answers with Cal's real details.
const FAQS: Faq[] = [
  {
    question: "How do I get started?",
    answer:
      "Placeholder: Reach out through the contact page to book an introductory flight. It's a great way to see what flying is like before committing to training.",
  },
  {
    question: "How long does it take to get a private pilot license?",
    answer:
      "Placeholder: It depends on how often you fly. Training a few times a week typically gets students there faster than flying once a week.",
  },
  {
    question: "How much do lessons cost?",
    answer:
      "Placeholder: Add instruction rates and aircraft rental costs here.",
  },
  {
    question: "Do I need a medical certificate?",
    answer:
      "Placeholder: Explain which FAA medical certificate students need and when they need it.",
  },
  {
    question: "What should I bring to my first lesson?",
    answer:
      "Placeholder: List what to bring, such as a photo ID, sunglasses and water.",
  },
];

export default function FaqPage() {
  return (
    <section className="py-16">
      <h1 className="font-display-header text-5xl md:text-7xl leading-tight">
        FAQ
      </h1>
      <div className="mt-12">
        <FaqList faqs={FAQS} />
      </div>
    </section>
  );
}
