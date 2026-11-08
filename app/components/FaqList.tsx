"use client";

import { useId, useState } from "react";
import { cx } from "../../utils/formatters";

export type Faq = { question: string; answer: string };

function FaqItem({ question, answer }: Faq) {
  const [open, setOpen] = useState(false);
  const answerId = useId();

  return (
    <li className="border-b border-neutral-800">
      <h2>
        <button
          aria-controls={answerId}
          aria-expanded={open}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg sm:text-xl"
          onClick={() => setOpen(!open)}
          type="button"
        >
          {question}
          {/* Round +/- toggle, styled like the homepage outline button. The
              symbol is drawn with two bars (not font glyphs) so it stays
              centred; the vertical bar disappears when open, leaving "-". */}
          <span
            aria-hidden
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#111010] shadow-[inset_0_0_0_2px_white] transition-colors duration-200 group-hover:bg-[#1f3fbf]"
          >
            <span className="absolute h-0.5 w-4 bg-white" />
            <span
              className={cx([
                "absolute h-4 w-0.5 bg-white transition-transform duration-200",
                open && "scale-y-0",
              ])}
            />
          </span>
        </button>
      </h2>
      {/* Grid rows animate from 0 to the answer's natural height. `inert` keeps
          the collapsed answer out of keyboard and screen-reader navigation. */}
      <div
        className={cx([
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ])}
        id={answerId}
        inert={!open}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 text-lg leading-relaxed text-neutral-300">
            {answer}
          </p>
        </div>
      </div>
    </li>
  );
}

// Accordion of questions; each answer expands when its question is clicked.
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <ul className="border-t border-neutral-800">
      {faqs.map((faq) => (
        <FaqItem key={faq.question} {...faq} />
      ))}
    </ul>
  );
}
