import { Users, Sparkles, Calendar } from "lucide-react";
import { Link } from "react-router";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="relative bg-linear-to-r from-primary via-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          {/* Floating Icons */}
          <div className="absolute left-1 sm:left-16 top-24 bg-white/20 p-3 rounded-xl backdrop-blur">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="absolute right-1 sm:right-20 top-28 bg-white/20 p-3 rounded-xl backdrop-blur">
            <Users className="w-6 h-6" />
          </div>
          <div className="absolute sm:left-24 bottom-35 bg-white/20 p-3 rounded-xl backdrop-blur">
            <Calendar className="w-6 h-6" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur mb-6">
            <Sparkles className="w-4 h-4" />
            Join 10,000+ community members
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Discover & Join
            <br />
            <span className="relative inline-block">
              Local Clubs
              <span className="absolute left-0 -bottom-2 w-full h-1 bg-orange-400 rounded-full"></span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto mt-6 text-lg text-white/90">
            Connect with photography enthusiasts, hiking groups, music clubs,
            sports and tech communities. Build meaningful connections in your
            area.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link
              to={"/clubs"}
              className="bg-orange-500 hover:bg-orange-600 transition px-7 py-3 rounded-xl font-semibold flex items-center gap-2 cursor-pointer"
            >
              Join a clubs →
            </Link>
            <Link
              to={"/events"}
              className="border border-white/40 hover:bg-white/10 transition px-7 py-3 rounded-xl font-semibold cursor-pointer"
            >
              Explore Events
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex justify-center gap-16 flex-wrap">
            <div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-white/80">Active Clubs</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-white/80">Members</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">2K+</h3>
              <p className="text-white/80">Events</p>
            </div>
          </div>
        </div>

        {/* Wavy Bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,80 C240,120 480,40 720,60 960,80 1200,120 1440,100 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroBanner;
