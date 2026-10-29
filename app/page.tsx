import Image from "next/image";
import { Metadata } from "next";
import { JsonLd } from "./components/JsonLd";
import { PixelClouds } from "./components/PixelClouds";
import { PixelPlane } from "./components/PixelPlane";
import {
  EMPLOYER,
  JOB_TITLE,
  LOCATION,
  PROFILE_LINKS,
  ROUTE_LABELS,
  ROUTES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "../utils/config";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    // Hero fills the screen below the header
    <section className="relative isolate grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center min-h-[calc(100dvh-5rem)] py-16">
      <PixelClouds layer="back" />
      <PixelPlane />
      <PixelClouds layer="front" />
      <JsonLd
        data={{
          "@type": "Person",
          name: SITE_NAME,
          url: SITE_URL,
          // TODO: Add a profile image to the public folder and uncomment the line below.
          // image: `${SITE_URL}${profile.src}`,
          description: SITE_DESCRIPTION,
          jobTitle: JOB_TITLE,
          worksFor: EMPLOYER && { "@type": "Organization", name: EMPLOYER },
          address: {
            "@type": "PostalAddress",
            addressLocality: LOCATION.locality,
            addressRegion: LOCATION.region,
            addressCountry: LOCATION.country,
          },
          sameAs: PROFILE_LINKS,
        }}
      />
      <div>
        {/* Pixel-art title image; its alt text keeps the heading readable for
            search engines and screen readers. */}
        <h1>
          <Image
            alt={SITE_NAME}
            className="h-auto w-full max-w-[610px] [image-rendering:pixelated]"
            height={36}
            priority
            src="/fly_with_cal_title.png"
            unoptimized
            width={305}
          />
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-neutral-300">
          {SITE_DESCRIPTION}
        </p>
        <div className="inline-flex gap-4">
          <Link
            href={ROUTES.about}
            className="font-display mt-6 inline-flex items-center justify-center leading-none whitespace-nowrap rounded-full bg-[#111010] px-4 sm:px-5 py-2.5 text-white shadow-[inset_0_0_0_2px_white] transition-colors duration-200 hover:bg-[#1f3fbf]"
          >
            {ROUTE_LABELS.about}
          </Link>
          <Link
            href={ROUTES.contact}
            className="font-display mt-6 inline-flex items-center justify-center leading-none whitespace-nowrap rounded-full bg-white px-4 sm:px-5 py-2.5 text-[#111010] transition-colors duration-200 hover:bg-[#1f3fbf] hover:text-white"
          >
            {ROUTE_LABELS.contact}
          </Link>
        </div>
      </div>
      {/* TODO: Image goes here, in the right column. */}
      <div />
    </section>
  );
}
