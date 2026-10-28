import Link from "next/link";
import { ROUTES } from "../utils/config";

export default function NotFound() {
  return (
    <div>
      <h2>404 | Not Found</h2>
      <Link
        className="flex items-center gap-1 underline mt-10"
        href={ROUTES.home}
      >
        Return home
      </Link>
    </div>
  );
}
