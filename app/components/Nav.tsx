"use client";

import Link from "next/link";
import { ROUTE_LABELS, ROUTES } from "../../utils/config";
import { useEffect, useRef, useState } from "react";
import { cx } from "../../utils/formatters";

// Scroll distance (px) before the header can hide, so it stays put near the
// top of the page and doesn't flicker on tiny scroll movements.
const HIDE_AFTER = 80;

const LINK_CLASSES =
  "py-1 px-2 underline decoration-transparent decoration-[3px] underline-offset-8 transition-colors duration-150 hover:decoration-[#020fc7]";

export const Nav = () => {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Hide the header while scrolling down; show it again on any scroll up.
  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > HIDE_AFTER);
      lastY.current = y;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      className={cx([
        "fixed inset-x-0 top-0 z-10 h-20 bg-[#111010] font-display tracking-tight",
        "transition-transform duration-300 ease-out",
        hidden && "-translate-y-full",
      ])}
    >
      <nav className="flex h-full items-center justify-between w-full max-w-6xl mx-auto px-6 md:px-10">
        <Link href={ROUTES.home} className={cx(["-ml-2", LINK_CLASSES])}>
          {ROUTE_LABELS.home}
        </Link>
        <div className="flex items-center gap-4">
          <Link href={ROUTES.about} className={LINK_CLASSES}>
            {ROUTE_LABELS.about}
          </Link>
          <Link href={ROUTES.faq} className={LINK_CLASSES}>
            {ROUTE_LABELS.faq}
          </Link>
          <Link
            href={ROUTES.contact}
            className="rounded-full bg-white px-5 py-2 text-[#111010] transition-colors duration-150 hover:bg-neutral-200"
          >
            {ROUTE_LABELS.contact}
          </Link>
        </div>
      </nav>
    </header>
  );
};
