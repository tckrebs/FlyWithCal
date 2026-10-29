import { LESSON_LOCATION } from "../../utils/config";

// Google Static Maps API key, inlined at build time. Restrict it in Google
// Cloud to this site's domain and to the Maps Static API only.
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

// The map is requested small and scaled up with crisp pixels, so roads and
// coastline come out blocky like a retro game overworld.
const MAP_WIDTH = 240;
const MAP_HEIGHT = 144;
const DISPLAY_SCALE = 2;
const ZOOM = 11;

// Map colours, taken from the site's palette.
const MAP_STYLES = [
  "feature:all|element:labels|visibility:off",
  "feature:poi|visibility:off",
  "feature:transit|visibility:off",
  "feature:landscape|color:0x26631d",
  "feature:poi.park|visibility:on",
  "feature:poi.park|element:geometry|color:0x4caf3c",
  "feature:water|color:0x7cb8f0",
  "feature:road.highway|element:geometry|color:0xffe36b",
  "feature:road.arterial|element:geometry|color:0xfff6c8",
  "feature:road.local|element:geometry|color:0x3a8a2c",
  "feature:transit.station.airport|visibility:on",
  "feature:transit.station.airport|element:geometry|color:0xb9b9a8",
  "feature:transit.station.airport|element:labels|visibility:off",
];

function mapUrl(key: string) {
  const params = new URLSearchParams({
    center: `${LESSON_LOCATION.lat},${LESSON_LOCATION.lng}`,
    zoom: String(ZOOM),
    size: `${MAP_WIDTH}x${MAP_HEIGHT}`,
    scale: "1",
    maptype: "roadmap",
    key,
  });
  for (const style of MAP_STYLES) params.append("style", style);
  return `https://maps.googleapis.com/maps/api/staticmap?${params}`;
}

// Pixel-art map of where lessons happen, linking to Google Maps directions.
export function PixelMap() {
  return (
    <div className="flex flex-col gap-2">
      <GoogleMap />
      <p className="font-display text-sm text-white">
        @ {LESSON_LOCATION.name}
        <br />
        <a
          className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors duration-150 hover:decoration-[#ffe36b]"
          href={LESSON_LOCATION.directionsUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Get directions →
        </a>
      </p>
    </div>
  );
}

// Styled Google Static Map, framed like a game window, with the homepage
// plane marking the airport.
function GoogleMap() {
  return (
    <a
      aria-label={`Directions to ${LESSON_LOCATION.name}`}
      className="group relative block overflow-hidden rounded-xl border-4 border-[#111010] outline outline-2 outline-white"
      href={LESSON_LOCATION.directionsUrl}
      rel="noopener noreferrer"
      style={{ width: MAP_WIDTH * DISPLAY_SCALE, maxWidth: "100%" }}
      target="_blank"
    >
      {API_KEY ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt=""
          className="block h-auto w-full [image-rendering:pixelated]"
          height={MAP_HEIGHT}
          loading="lazy"
          src={mapUrl(API_KEY)}
          width={MAP_WIDTH}
        />
      ) : (
        // Shown until NEXT_PUBLIC_GOOGLE_MAPS_KEY is set.
        <div
          className="flex w-full items-end justify-center pb-3 bg-[#26631d] text-xs text-white/70"
          style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
        >
          Map preview (add API key)
        </div>
      )}
      {/* Plane marker over the airport, which sits at the map's centre */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 group-hover:-translate-y-[60%]">
        <div className="motion-safe:animate-bob">
          <div
            className="h-[21px] w-[58px] bg-no-repeat [background-size:200%_100%] [image-rendering:pixelated] motion-safe:animate-prop"
            style={{ backgroundImage: "url(/pilot_plane.png)" }}
          />
        </div>
      </div>
    </a>
  );
}
