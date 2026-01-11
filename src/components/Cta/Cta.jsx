import { Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Cta = () => {
  return (
    <section className="container mx-auto px-4 py-15">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#1a8567] via-[#258d92] to-[#1e7eb0] px-8 py-16 text-center text-white shadow-xl"
      >
        {/* Decorative Top Left Icon */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10"
        >
          <Sparkles className="h-5 w-5 text-emerald-200" />
        </motion.div>

        {/* Content Container */}
        <div className="mx-auto max-w-2xl">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium backdrop-blur-sm"
          >
            Ready to get started?
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-4xl font-bold tracking-tight md:text-5xl leading-[1.2]"
          >
            Start Building Your Community Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-emerald-50/80"
          >
            Join thousands of club managers who are creating thriving
            communities. It's free to get started.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to={"/clubs"}
              className="btn border-none bg-[#f27447] text-white hover:bg-[#e06336] px-8"
            >
              Browse Clubs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Decorative Bottom Right Square */}
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-8 right-8 h-12 w-12 rounded-xl bg-white/10 backdrop-blur-md"
        />
      </motion.div>
    </section>
  );
};

export default Cta;
