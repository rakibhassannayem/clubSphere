import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Discover Clubs",
      desc: "Browse hundreds of local clubs based on your interests, from photography to hiking to book clubs.",
      icon: "🔍",
      color: "bg-gradient-to-br from-primary/50 to-emerald-400",
    },
    {
      id: 2,
      title: "Join & Connect",
      desc: "Sign up for free or paid memberships and instantly connect with like-minded community members.",
      icon: "👤+",
      color: "bg-gradient-to-br from-orange-200 to-orange-400",
    },
    {
      id: 3,
      title: "Attend Events",
      desc: "Register for exciting events, workshops, and meetups organized by your clubs.",
      icon: "📅",
      color: "bg-gradient-to-br from-purple-400 to-indigo-500",
    },
    {
      id: 4,
      title: "Build Community",
      desc: "Create lasting friendships, share experiences, and grow together with your club family.",
      icon: "❤️",
      color: "bg-gradient-to-br from-teal-400 to-orange-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            How ClubSphere Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-accent"
          >
            Get started in minutes. Find your community and start connecting with
            amazing people today. Our simple four-step process makes it easy for everyone.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8"
        >
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10" />

          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="flex flex-col items-center text-center flex-1"
            >
              {/* Step Number & Icon */}
              <div className="relative mb-6">
                {/* Small Number Badge */}
                <div className="absolute -top-4 -left-8 w-8 h-8 border-2 text-primary rounded-full flex items-center justify-center font-bold bg-white z-10">
                  {step.id}
                </div>

                {/* Icon Box */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl ${step.color} cursor-pointer`}
                >
                  <span className="drop-shadow-md">{step.icon}</span>
                </motion.div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-secondary mb-3">
                {step.title}
              </h3>
              <p className="text-accent text-sm leading-relaxed px-2">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
