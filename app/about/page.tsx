import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../../utils/config";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

// Chunky pixel border shared by the panels, matching the gallery cartridges.
const PIXEL_PANEL =
  "bg-[#2b2a2a] shadow-[0_0_0_4px_#111010,6px_6px_0_4px_#111010]";

// TODO: Replace the placeholder stats, badges and timeline with Cal's real details.
const STATS = [
  { label: "Flight hours", value: "1,000+" },
  { label: "Students trained", value: "50+" },
  { label: "Years flying", value: "10" },
];

const BADGES = [
  "Private Pilot",
  "Instrument Rating",
  "Commercial Pilot",
  "CFI",
  "CFII",
];

const TIMELINE = [
  { level: "World 1", title: "First flight", text: "Placeholder: How it all started." },
  { level: "World 2", title: "Private pilot license", text: "Placeholder: Earning the first certificate." },
  { level: "World 3", title: "Commercial & instrument", text: "Placeholder: Leveling up the ratings." },
  { level: "World 4", title: "Flight instructor", text: "Placeholder: Teaching students at CRQ." },
];

export default function AboutPage() {
  return (
    <section className="py-16">
      <h1 className="font-display-header text-5xl md:text-7xl leading-tight">
        About
      </h1>

      {/* Player profile: sprite on the left, bio and stats on the right. */}
      <div className={`mt-12 grid gap-8 p-6 sm:p-8 md:grid-cols-[auto_1fr] ${PIXEL_PANEL}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-48 w-36 items-end justify-center bg-[#5c94fc] p-4 shadow-[0_0_0_2px_#111010]">
            <Image
              alt="Pixel-art Cal"
              // The PNG has extra transparent space on its right, so nudge the
              // character right to sit visually centred in the tile.
              className="translate-x-2.5 [image-rendering:pixelated]"
              height={140}
              src="/cal_fullbody.png"
              unoptimized
              width={96}
            />
          </div>
          <p className="font-display text-xs text-[#ffe36b]">PLAYER 1</p>
        </div>
        <div>
          <h2 className="font-display text-xl sm:text-2xl">Cal</h2>
          <p className="mt-1 font-display text-xs text-neutral-400">
            Certified Flight Instructor
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Placeholder: A few sentences about Cal's background, why he loves
            flying and what students can expect from training with him.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-[10px] text-neutral-400 sm:text-xs">
                  {s.label}
                </dt>
                <dd className="mt-2 font-display text-lg text-white sm:text-2xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <h2 className="mt-20 font-display text-xl sm:text-2xl">Unlocked</h2>
      <ul className="mt-8 flex flex-wrap gap-4">
        {BADGES.map((b) => (
          <li
            className={`flex items-center gap-3 px-4 py-3 font-display text-xs ${PIXEL_PANEL}`}
            key={b}
          >
            <span aria-hidden className="text-[#ffe36b]">★</span>
            {b}
          </li>
        ))}
      </ul>

      <h2 className="mt-20 font-display text-xl sm:text-2xl">Flight Path</h2>
      {/* Dotted path linking each career "world", like an overworld map. */}
      <ol className="mt-8 border-l-4 border-dotted border-neutral-600 pl-8">
        {TIMELINE.map((t) => (
          <li className="relative pb-10 last:pb-0" key={t.level}>
            <span
              aria-hidden
              className="absolute -left-[46px] top-1 h-5 w-5 bg-[#ffe36b] shadow-[0_0_0_3px_#111010]"
            />
            <p className="font-display text-xs text-[#ffe36b]">{t.level}</p>
            <h3 className="mt-2 font-display text-base sm:text-lg">{t.title}</h3>
            <p className="mt-2 max-w-2xl text-lg leading-relaxed text-neutral-300">
              {t.text}
            </p>
          </li>
        ))}
      </ol>

      <Link
        className="mt-16 inline-flex rounded-full bg-white px-5 py-3 font-display text-sm text-[#111010] transition-colors hover:bg-[#1f3fbf] hover:text-white"
        href={ROUTES.gallery}
      >
        See the flights ▶
      </Link>
    </section>
  );
}
