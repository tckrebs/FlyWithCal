import { SITE_NAME, SOCIAL_LINKS } from "../../utils/config";
import { InstagramIcon, LinkedinIcon } from "./Icons";

const SOCIALS = [
  { href: SOCIAL_LINKS.instagram, icon: <InstagramIcon /> },
  { href: SOCIAL_LINKS.linkedin, icon: <LinkedinIcon /> },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-6 md:px-10 py-4">
        <span className="text-xs text-zinc-500">
          © {new Date().getFullYear()} {SITE_NAME}
        </span>
        <div className="flex gap-3 text-neutral-300 align-bottom dark:text-neutral-300">
          {SOCIALS.map(({ href, icon }) => (
            <a
              className="flex items-end text-neutral-600 hover:text-neutral-100 transition-all"
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
