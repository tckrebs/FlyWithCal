import { SITE_NAME, SOCIAL_LINKS } from "../../utils/config";
import { InstagramIcon, LinkedinIcon } from "./Icons";

const SOCIALS = [
  { href: SOCIAL_LINKS.instagram, icon: <InstagramIcon /> },
  { href: SOCIAL_LINKS.linkedin, icon: <LinkedinIcon /> },
];

export function Footer() {
  return (
    <footer className="bg-[#2f7a24]">
      {/* Pixel-grass strip along the top edge, tiled from public/grass_edge.svg. */}
      <div
        aria-hidden
        className="h-4 bg-[url(/grass_edge.svg)] bg-repeat-x [background-size:32px_16px] [image-rendering:pixelated]"
      />
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <span className="text-xs text-white">
          © {new Date().getFullYear()} {SITE_NAME}
        </span>
        <div className="flex gap-3 align-bottom">
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
    </footer>
  );
}
