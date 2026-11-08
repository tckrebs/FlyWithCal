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
    <>
      {/* Hero fills the screen below the header */}
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

      {/* Sky section: the dark page fades into blue as you scroll down, then
          meets the footer's grass edge. The background spans the full screen
          width while the content stays in the page column. */}
      <section className="relative isolate py-24 md:py-32">
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 -z-20 w-screen -translate-x-1/2 bg-[linear-gradient(#111010_0%,#1f3fbf_18%,#5c94fc_45%,#9cc4ff_100%)]"
        />
        <PixelClouds layer="sky" />
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 pt-24">
          <div>
            <h2 className="font-display-header text-2xl leading-snug text-outline sm:text-3xl">
              Placeholder heading
            </h2>
            {/* TODO: Replace with real copy. */}
            <p className="mt-6 text-lg leading-relaxed text-[#111010]">
              Placeholder: A few sentences about what flying with Cal is like,
              from the first lesson to the views along the coast.
            </p>
          </div>
          <div className="bg-[#2b2a2a] p-3 shadow-[0_0_0_4px_#111010,6px_6px_0_4px_#111010]">
            <Image
              alt="Cal and a student smiling in the cockpit over the ocean"
              className="h-auto w-full"
              height={1050}
              src="/cockpit_selfie.jpg"
              unoptimized
              width={1400}
            />
          </div>
        </div>
      </section>
    </>
  );
}
