import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        404
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-base leading-7 text-muted">
        The page you are looking for may have been moved, removed, or never
        existed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Back to home
      </Link>
    </main>
  );
}
