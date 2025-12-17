import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Cta = () => {
  return (
    <section className="container mx-auto px-4 py-15">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#1a8567] via-[#258d92] to-[#1e7eb0] px-8 py-16 text-center text-white shadow-xl">
        {/* Decorative Top Left Icon */}
        <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
          <Sparkles className="h-5 w-5 text-emerald-200" />
        </div>

        {/* Content Container */}
        <div className="mx-auto max-w-2xl">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium backdrop-blur-sm">
            Ready to get started?
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            Start Building Your Community Today
          </h2>

          <p className="mt-6 text-lg text-emerald-50/80">
            Join thousands of club managers who are creating thriving
            communities. It's free to get started.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to={"/clubs"}
              className="btn border-none bg-[#f27447] text-white hover:bg-[#e06336] px-8"
            >
              Browse Clubs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Decorative Bottom Right Square */}
        <div className="absolute bottom-8 right-8 h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md" />
      </div>
    </section>
  );
};

export default Cta;
