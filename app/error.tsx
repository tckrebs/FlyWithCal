"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // log error
  useEffect(() =>  console.error(error), [error]);

  return (
    <div>
      <h2>500 | Internal Server Error</h2>
      <button onClick={reset}>
        Try again
      </button>
    </div>
  );
}
