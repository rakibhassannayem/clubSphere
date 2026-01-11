import { motion } from "framer-motion";
import {
  Users,
  Target,
  Sparkles,
  Heart,
  CalendarDays,
  ShieldCheck,
  Zap,
  Building2,
} from "lucide-react";
import Cta from "../../components/Cta/Cta";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const About = () => {
  const axiosSecure = useAxiosSecure();
  // Fetch Events Count
  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  // Fetch Clubs Count
  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  // Fetch Members Count
  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/userCount");
      return res.data;
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const stats = [
    { label: "Active Clubs", value: Math.max(0, clubs.length - 1) + "+", icon: Building2 },
    { label: "Community Members", value: Math.max(0, members - 1) + "+", icon: Users },
    { label: "Events", value: Math.max(0, events.length - 1) + "+", icon: CalendarDays },
  ];

  const values = [
    {
      title: "Community First",
      description:
        "We believe in the power of local communities to bring people together and create lasting bonds.",
      icon: Heart,
    },
    {
      title: "Inclusion",
      description:
        "Every passion has a place here. We foster an environment where everyone feels welcome.",
      icon: Users,
    },
    {
      title: "Innovation",
      description:
        "We're constantly evolving our platform to better serve our club managers and members.",
      icon: Sparkles,
    },
    {
      title: "Safety & Trust",
      description:
        "We prioritize the security and privacy of our members above all else.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section
      <section className="relative overflow-hidden pt-12">
        <div className="bg-linear-to-r from-primary via-teal-600 to-teal-800 text-white">
          <motion.div
            className="container mx-auto px-6 py-20 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm backdrop-blur mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Empowering passion everywhere
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Building the Future of
              <br />
              <span className="relative inline-block">
                Social Connectivity
                <span className="absolute left-0 -bottom-2 w-full h-1 bg-orange-400 rounded-full"></span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-3xl mx-auto mt-8 text-lg text-white/90 leading-relaxed"
            >
              clubSphere is more than just a platform; it's a movement aimed at
              bridging the gap between interests and interaction. We help you
              find your tribe and turn your passions into experiences.
            </motion.p>
          </motion.div>
        </div>
      </section> */}

      {/* Our Mission & Vision */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-secondary">
                Our Mission & Vision
              </h2>
              <p className="text-accent text-lg leading-relaxed">
                Our mission is to democratize community building. We provide the
                tools and platform for anyone to start, grow, and manage a club
                centered around their passion.
              </p>
              <p className="text-accent text-lg leading-relaxed">
                We envision a world where physical distance no longer limits
                social connection, and where every enthusiast can easily find a
                community that resonates with them.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-base-100 p-8 rounded-3xl shadow-xs border border-gray-100 flex flex-col items-center text-center"
                >
                  <stat.icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-3xl font-bold text-secondary">
                    {stat.value}
                  </h3>
                  <p className="text-accent">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              What We Stand For
            </h2>
            <p className="text-accent">
              Our core values guide everything we do, from product development to
              how we support our communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-base-100 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-3">
                  {value.title}
                </h3>
                <p className="text-accent leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-base-300 text-secondary overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-8"
            >
              The Story Behind clubSphere
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-accent text-lg leading-relaxed"
            >
              <p>
                Founded in 2024, clubSphere was born from a simple observation:
                while we are more connected digitally than ever, finding genuine,
                passionate local communities is still surprisingly difficult.
              </p>
              <p>
                Our founders wanted to create a space where the barrier to starting
                a new club was non-existent. Whether you're a chess grandmaster, a
                weekend hiker, or a coding enthusiast, clubSphere gives you the
                digital home you need to build your physical community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <Cta />
    </div>
  );
};

export default About;
