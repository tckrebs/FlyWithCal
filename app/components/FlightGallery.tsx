"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "../../utils/formatters";

export type FlightMedia = {
  // Level name shown on the cartridge label, e.g. "1-1 Coastal Run".
  title: string;
  caption?: string;
  type: "photo" | "video";
  // Path under /public. Leave empty to show a placeholder sky.
  src?: string;
  // Still image for video cartridges.
  poster?: string;
};

// Chunky pixel border: a hard 4px outline plus a stepped drop shadow.
const PIXEL_FRAME =
  "shadow-[0_0_0_4px_#111010,6px_6px_0_4px_#111010] bg-[#2b2a2a]";

function Placeholder() {
  return (
    <div
      aria-hidden
      className="h-full w-full bg-[linear-gradient(#5c94fc_0%,#5c94fc_60%,#9cc4ff_60%,#9cc4ff_75%,#58a838_75%)]"
    />
  );
}

function Cartridge({
  item,
  onOpen,
}: {
  item: FlightMedia;
  onOpen: () => void;
}) {
  const thumb = item.type === "video" ? item.poster : item.src;

  return (
    <li>
      <button
        className={cx([
          "group block w-full text-left transition-transform duration-150 ease-out hover:-translate-y-1 hover:rotate-[-1deg] focus-visible:-translate-y-1",
          PIXEL_FRAME,
        ])}
        onClick={onOpen}
        type="button"
      >
        {/* Cartridge notch along the top edge. */}
        <div className="flex h-3 justify-center bg-[#111010]">
          <div className="h-full w-1/3 bg-[#2b2a2a]" />
        </div>
        <div className="p-3">
          <div className="relative aspect-[4/3] overflow-hidden shadow-[0_0_0_2px_#111010]">
            {thumb ? (
              <img
                alt=""
                className="h-full w-full object-cover [image-rendering:auto]"
                loading="lazy"
                src={thumb}
              />
            ) : (
              <Placeholder />
            )}
            {item.type === "video" && (
              <span className="absolute left-2 top-2 bg-[#111010] px-2 py-1 font-display text-[10px] text-white">
                ▶ VIDEO
              </span>
            )}
            <span className="absolute inset-x-0 bottom-2 text-center font-display text-xs text-white opacity-0 text-outline group-hover:animate-pulse group-hover:opacity-100 group-focus-visible:opacity-100">
              PRESS START
            </span>
          </div>
          <p className="mt-3 truncate font-display text-xs text-white sm:text-sm">
            {item.title}
          </p>
        </div>
      </button>
    </li>
  );
}

// Lightbox styled as an old CRT TV, with scanlines over the picture.
function CrtViewer({
  item,
  onClose,
  onStep,
}: {
  item: FlightMedia | null;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (item && !dialog.open) dialog.showModal();
    if (!item && dialog.open) dialog.close();
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onStep]);

  return (
    <dialog
      aria-label={item?.title}
      className="w-[min(92vw,900px)] bg-transparent p-0 backdrop:bg-black/80"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onClose={onClose}
      ref={ref}
    >
      {item && (
        <div className="rounded-[28px] bg-[#c9b48a] p-4 shadow-[inset_0_0_0_4px_#111010] sm:p-6">
          <div className="relative aspect-video overflow-hidden rounded-[40px/30px] bg-black shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]">
            {!item.src ? (
              <Placeholder />
            ) : item.type === "video" ? (
              <video
                autoPlay
                className="h-full w-full object-contain"
                controls
                playsInline
                poster={item.poster}
                src={item.src}
              />
            ) : (
              <img
                alt={item.caption ?? item.title}
                className="h-full w-full object-contain"
                src={item.src}
              />
            )}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent_0_2px,rgba(0,0,0,0.25)_2px_4px)]"
            />
          </div>
          <div className="mt-4 flex items-center justify-between gap-4 text-[#111010]">
            <div className="min-w-0">
              <p className="truncate font-display text-sm sm:text-base">
                {item.title}
              </p>
              {item.caption && (
                <p className="mt-1 text-sm sm:text-base">{item.caption}</p>
              )}
            </div>
            <div className="flex shrink-0 gap-2 font-display text-xs">
              {[
                { label: "◀", aria: "Previous", run: () => onStep(-1) },
                { label: "▶", aria: "Next", run: () => onStep(1) },
                { label: "✕", aria: "Close", run: onClose },
              ].map((b) => (
                <button
                  aria-label={b.aria}
                  className="h-10 w-10 rounded-full bg-[#111010] text-white transition-colors hover:bg-[#1f3fbf]"
                  key={b.aria}
                  onClick={b.run}
                  type="button"
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

// Grid of cartridge tiles; clicking one plays it on the CRT viewer.
export function FlightGallery({ items }: { items: FlightMedia[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + items.length) % items.length));

  return (
    <>
      <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Cartridge item={item} key={item.title} onOpen={() => setIndex(i)} />
        ))}
      </ul>
      <CrtViewer
        item={index === null ? null : items[index]}
        onClose={() => setIndex(null)}
        onStep={step}
      />
    </>
  );
}
