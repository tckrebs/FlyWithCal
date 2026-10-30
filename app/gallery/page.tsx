import { Metadata } from "next";
import { FlightGallery, FlightMedia } from "../components/FlightGallery";

export const metadata: Metadata = {
  title: "Gallery",
  alternates: { canonical: "/gallery" },
};

// TODO: Put Cal's photos/videos in public/flights/ and set each `src`.
const FLIGHTS: FlightMedia[] = [
  { title: "1-1 Coastal Run", caption: "Placeholder caption", type: "photo" },
  { title: "1-2 Above the Clouds", type: "photo" },
  { title: "1-3 Sunset Approach", type: "video" },
  { title: "2-1 Mountain Pass", type: "photo" },
  { title: "2-2 Night Lights", type: "photo" },
  { title: "2-3 Touch and Go", type: "video" },
];

export default function GalleryPage() {
  return (
    <section className="py-16">
      <h1 className="font-display-header text-5xl md:text-7xl leading-tight">
        Gallery
      </h1>
      <h2 className="mt-16 font-display text-xl sm:text-2xl">Select a Flight</h2>
      <div className="mt-10">
        <FlightGallery items={FLIGHTS} />
      </div>
    </section>
  );
}
