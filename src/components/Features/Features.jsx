import { motion } from "framer-motion";
import { Shield, Zap, Users, Globe, Smartphone, Heart } from "lucide-react";

const features = [
  {
    title: "Secure Management",
    description: "Robust tools to manage your club members and events with total peace of mind.",
    icon: Shield,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Instant Connection",
    description: "Connect with enthusiasts in your area instantly through our real-time platform.",
    icon: Zap,
    color: "bg-amber-500/10 text-amber-500",
  },
  {
    title: "Growing Community",
    description: "Join a thriving network of thousands of members across hundreds of diverse clubs.",
    icon: Users,
    color: "bg-emerald-500/10 text-emerald-500",
  },
  {
    title: "Global Reach",
    description: "Find clubs not just locally, but discover global communities that share your passion.",
    icon: Globe,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Mobile Friendly",
    description: "Access your dashboard and manage events on the go with our fully responsive design.",
    icon: Smartphone,
    color: "bg-rose-500/10 text-rose-500",
  },
  {
    title: "Passion Driven",
    description: "A platform built by enthusiasts for enthusiasts, prioritizing what matters to you.",
    icon: Heart,
    color: "bg-orange-500/10 text-orange-500",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            Why Choose clubSphere?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-accent"
          >
            We provide everything you need to build, manage, and scale your local or global communities effortlessly.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-base-200 border border-base-300 hover:border-primary/30 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
              <p className="text-accent leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
