import { cx } from "../../utils/formatters";

// Pixel-art clouds, drawn as SVG from character grids:
// "o" outline, "w" white, "b" blue shading, "." empty.
const PUFF = [
  "........oooo........",
  ".......owwwwo.......",
  "....ooowwwwwwo......",
  "...owwwwwwwwwwoo....",
  "..owwwwwwwwwwwwwo...",
  ".owwwwwwwwwwwwwwwo..",
  "owwwwwwwwwwwwwwwwwo.",
  "owwwwwwwwwwwwwwwwwwo",
  "owwbwwwwbwwwwbwwwwwo",
  "owbbbwwbbbwwbbbwwbwo",
  ".obbbbbbbbbbbbbbbbo.",
  "..oooooooooooooooo..",
];

const BANK = [
  "......oooo......oooo......oooo..",
  ".....owwwwo....owwwwo....owwwwo.",
  "...ooowwwwwoooowwwwwwoooowwwwwo.",
  "..owwwwwwwwwwwwwwwwwwwwwwwwwwwoo",
  ".owwwwwwwwwwwwwwwwwwwwwwwwwwwwwo",
  "owwwwwwwwwwwwwwwwwwwwwwwwwwwwwwo",
  "owwbwwwwbwwwwbwwwwbwwwwbwwwwbwwo",
  "owbbbwwbbbwwbbbwwbbbwwbbbwwbbbwo",
  ".obbbbbbbbbbbbbbbbbbbbbbbbbbbbo.",
  "..oooooooooooooooooooooooooooo..",
];

const COLORS: Record<string, string> = {
  o: "#111010",
  w: "#ffffff",
  b: "#7cb8f0",
};

// Size of one cloud pixel, in screen pixels.
const SCALE = 5;

function Cloud({ grid, className }: { grid: string[]; className: string }) {
  const width = grid[0].length;
  const height = grid.length;

  return (
    <svg
      className={cx(["absolute", className])}
      height={height * SCALE}
      shapeRendering="crispEdges"
      viewBox={`0 0 ${width} ${height}`}
      width={width * SCALE}
    >
      {grid.flatMap((row, y) =>
        [...row].map((cell, x) =>
          COLORS[cell] ? (
            <rect fill={COLORS[cell]} height={1} key={`${x}-${y}`} width={1} x={x} y={y} />
          ) : null,
        ),
      )}
    </svg>
  );
}

type Layer = "back" | "front";

// Placed around the edges so they stay clear of the hero text. "front" clouds
// render above the plane and "back" clouds below it, so it weaves between them.
const CLOUDS: { grid: string[]; className: string; layer: Layer }[] = [
  { grid: PUFF, className: "top-[8%] left-[4%] motion-safe:animate-drift-slow", layer: "back" },
  { grid: BANK, className: "top-[14%] left-[58%] motion-safe:animate-drift", layer: "front" },
  { grid: PUFF, className: "top-[46%] right-[4%] motion-safe:animate-drift-slow", layer: "front" },
  { grid: BANK, className: "bottom-[10%] left-[10%] motion-safe:animate-drift", layer: "front" },
  { grid: PUFF, className: "bottom-[22%] left-[62%] motion-safe:animate-drift-slow", layer: "back" },
];

// Full-width cloud layer that sits behind its parent's content. Render the
// "back" layer before <PixelPlane /> and the "front" layer after it.
export function PixelClouds({ layer }: { layer: Layer }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden opacity-90"
    >
      {CLOUDS.filter((cloud) => cloud.layer === layer).map(({ grid, className }, i) => (
        <Cloud className={className} grid={grid} key={i} />
      ))}
    </div>
  );
}
