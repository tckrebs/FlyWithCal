import { preload } from "react-dom";

// Pixel-art Cessna with Cal at the controls, flying left to right across the screen.
// The sprite sheet (public/pilot_plane.png) holds two 115x42 frames side by side;
// stepping between them makes the propeller spin. On hover, Cal turns and waves
// (public/pilot_plane_wave.png, same layout).
export function PixelPlane() {
  // Load the waving sprite up front so the hover swap doesn't flicker.
  preload("/pilot_plane_wave.png", { as: "image" });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
    >
      {/* Full-size layer that shifts the plane to a new height between passes */}
      <div className="absolute inset-0 translate-y-[8%] motion-safe:animate-fly-lanes">
        {/* Moves the plane across the screen */}
        <div className="absolute top-0 left-0 motion-safe:animate-fly">
          {/* Gentle up-and-down bob */}
          <div className="motion-safe:animate-bob">
            {/* The plane itself; the propeller spins by swapping sprite frames.
                It takes the pointer (unlike its wrapper) so hovering shows Cal waving. */}
            <div className="pointer-events-auto h-[63px] w-[173px] md:h-[84px] md:w-[230px] bg-no-repeat [background-image:url(/pilot_plane.png)] hover:[background-image:url(/pilot_plane_wave.png)] [background-size:200%_100%] [image-rendering:pixelated] motion-safe:animate-prop" />
          </div>
        </div>
      </div>
    </div>
  );
}
