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
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "../utils/config";

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
      </div>
      {/* TODO: Image goes here, in the right column. */}
      <div />
    </section>
  );
}
