"use client";

import Link from "next/link";
import Image from "next/image";
import { ROUTE_LABELS, ROUTES } from "../../utils/config";
import { useEffect, useRef, useState } from "react";
import { cx } from "../../utils/formatters";

// Scroll distance (px) before the header can hide, so it stays put near the
// top of the page and doesn't flicker on tiny scroll movements.
const HIDE_AFTER = 80;

const LINK_CLASSES =
  "inline-flex items-center justify-center leading-none whitespace-nowrap py-1 px-2 underline decoration-transparent decoration-[3px] underline-offset-8 transition-colors duration-150 hover:decoration-[#1f3fbf]";

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
      <nav className="flex h-full items-center justify-between w-full max-w-6xl mx-auto px-6 md:px-10 text-xs sm:text-sm">
        {/* Logo-only home link; on hover Cal waves and the logo lifts slightly. */}
        <Link
          aria-label={ROUTE_LABELS.home}
          className="group relative block transition-transform duration-150 hover:-translate-y-0.25"
          href={ROUTES.home}
        >
          <Image
            alt=""
            className="[image-rendering:pixelated] group-hover:invisible"
            height={48}
            priority
            src="/cal_fullbody.png"
            unoptimized
            width={33}
          />
          <Image
            alt=""
            className="[image-rendering:pixelated] invisible absolute inset-0 group-hover:visible"
            height={48}
            src="/cal_fullbody_wave.png"
            unoptimized
            width={33}
          />
        </Link>
        <div className="flex items-center gap-1 sm:gap-4">
          <Link href={ROUTES.about} className={LINK_CLASSES}>
            {ROUTE_LABELS.about}
          </Link>
          <Link href={ROUTES.faq} className={LINK_CLASSES}>
            {ROUTE_LABELS.faq}
          </Link>
          <Link
            href={ROUTES.contact}
            className="inline-flex items-center justify-center leading-none whitespace-nowrap rounded-full bg-white px-4 sm:px-5 py-2.5 text-[#111010] transition-shadow duration-200 hover:shadow-[0_0_0_3px_#1f3fbf]"
          >
            {ROUTE_LABELS.contact}
          </Link>
        </div>
      </nav>
    </header>
  );
};
