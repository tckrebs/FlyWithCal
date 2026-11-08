// Pixel-art glyphs drawn from character grids ("#" filled, "." empty) in the
// current text colour, so hover colours still apply. Each grid pixel renders
// as a `scale` x `scale` block.
function PixelGlyph({ grid, scale }: { grid: string[]; scale: number }) {
  const size = grid.length;
  return (
    <svg
      height={size * scale}
      shapeRendering="crispEdges"
      viewBox={`0 0 ${size} ${size}`}
      width={size * scale}
      xmlns="http://www.w3.org/2000/svg"
    >
      {grid.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "#" ? (
            <rect
              fill="currentColor"
              height={1}
              key={`${x}-${y}`}
              width={1}
              x={x}
              y={y}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

const INSTAGRAM = [
  ".##########.",
  "#..........#",
  "#........#.#",
  "#...####...#",
  "#..#....#..#",
  "#..#....#..#",
  "#..#....#..#",
  "#..#....#..#",
  "#...####...#",
  "#..........#",
  "#..........#",
  ".##########.",
];

const LINKEDIN = [
  ".##########.",
  "############",
  "##..########",
  "############",
  "##..#....###",
  "##..#..#..##",
  "##..#..#..##",
  "##..#..#..##",
  "##..#..#..##",
  "##..#..#..##",
  "############",
  ".##########.",
];

type PixelIconProps = { scale?: number };

export function InstagramIcon({ scale = 2 }: PixelIconProps) {
  return (
    <div className="inline-flex">
      <PixelGlyph grid={INSTAGRAM} scale={scale} />
    </div>
  );
}

export function LinkedinIcon({ scale = 2 }: PixelIconProps) {
  return (
    <div className="inline-flex">
      <PixelGlyph grid={LINKEDIN} scale={scale} />
    </div>
  );
}
