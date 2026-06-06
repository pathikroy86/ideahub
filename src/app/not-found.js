import Link from "next/link";

export const metadata = {
  title: "Page Not Found | IdeaHub",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-[#f8f9ff] px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-8 -z-10 h-48 w-48 -translate-x-1/2 rounded-full bg-[#dfe3ff] blur-3xl" />
      <div className="absolute bottom-12 right-8 -z-10 h-36 w-36 rounded-full bg-[#d9f7ee] blur-3xl" />

      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex justify-center lg:justify-start">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80">
            <div className="absolute inset-0 rounded-[2rem] border border-white bg-white shadow-[0_24px_70px_rgba(42,53,121,0.12)]" />
            <div className="absolute left-8 top-8 h-16 w-16 rounded-2xl bg-[#4f46e5] shadow-[0_16px_34px_rgba(79,70,229,0.25)]" />
            <div className="absolute right-8 top-12 h-12 w-12 rounded-full bg-[#2dd4bf]" />
            <div className="absolute bottom-10 left-10 right-10 rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
                <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                <span className="h-3 w-3 rounded-full bg-[#10b981]" />
              </div>
              <div className="space-y-3">
                <span className="block h-3 w-4/5 rounded-full bg-slate-200" />
                <span className="block h-3 w-3/5 rounded-full bg-slate-200" />
                <span className="block h-10 w-full rounded-xl bg-[#eef0ff]" />
              </div>
            </div>
            <p className="absolute inset-x-0 top-24 text-center text-7xl font-black tracking-normal text-slate-950 sm:text-8xl">
              404
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="mb-4 text-sm font-bold uppercase tracking-normal text-[#4f46e5]">
            Page not found
          </p>
          <h1 className="text-4xl font-black tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            This idea slipped out of the vault.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            The page you are looking for does not exist, may have moved, or is
            waiting to become someone&apos;s next big idea.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-[#4f46e5] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(79,70,229,0.25)] transition hover:bg-[#4338ca] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2"
            >
              Back to Home
            </Link>
            <Link
              href="/ideas"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:border-[#6f7cf6] hover:text-[#3651d6] focus:outline-none focus:ring-2 focus:ring-[#6f7cf6] focus:ring-offset-2"
            >
              Browse Ideas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
