import Image from "next/image";
import {
  ROUTE_LABELS,
  ROUTES,
  SITE_NAME,
  SOCIAL_LINKS,
} from "../../utils/config";
import { InstagramIcon, LinkedinIcon } from "./Icons";
import { PixelMap } from "./PixelMap";
import Link from "next/link";

const SOCIALS = [
  { href: SOCIAL_LINKS.instagram, icon: <InstagramIcon scale={3} /> },
  { href: SOCIAL_LINKS.linkedin, icon: <LinkedinIcon scale={3} /> },
];

export function Footer() {
  return (
    <footer className="bg-[#2f7a24]">
      {/* Pixel-grass strip along the top edge, tiled from public/grass_edge.svg. */}
      <div
        aria-hidden
        className="h-4 bg-[url(/grass_edge.svg)] bg-repeat-x [background-size:32px_16px] [image-rendering:pixelated]"
      />
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between w-full max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="flex flex-col gap-1">
          <Image
            alt={SITE_NAME}
            className="h-auto w-[152px] max-w-full [image-rendering:pixelated]"
            height={18}
            src="/fly_with_cal_title.png"
            unoptimized
            width={152}
          />
          <span className="font-display text-xs text-white">
            © {new Date().getFullYear()}
          </span>

          <Link
            href={ROUTES.contact}
            className="font-display mt-6 inline-flex items-center justify-center leading-none whitespace-nowrap rounded-full bg-white px-4 sm:px-5 py-2.5 text-[#111010] transition-colors duration-200 hover:bg-[#ffe36b] hover:text-[#111010]"
          >
            {ROUTE_LABELS.contact}
          </Link>

          <div className="mt-3 ml-2 flex gap-3">
            {SOCIALS.map(({ href, icon }) => (
              <a
                className="flex items-end text-white hover:text-[#ffe36b] transition-all"
                href={href}
                key={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        <PixelMap />
      </div>
    </footer>
  );
}
