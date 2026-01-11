import { motion } from "framer-motion";
import { ShieldCheck, Lock, UserCheck, HeartHandshake } from "lucide-react";

const trustItems = [
  {
    title: "Secure Transactions",
    description: "All payments are processed through Stripe, ensuring your financial data is always protected.",
    icon: Lock,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Verified Managers",
    description: "Every club manager goes through a verification process to maintain community quality.",
    icon: UserCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Data Privacy",
    description: "We never sell your personal data. Your privacy and community safety are our top priorities.",
    icon: ShieldCheck,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Community Standards",
    description: "Strict guidelines and easy reporting tools to keep groups friendly and inclusive.",
    icon: HeartHandshake,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

const CommunityTrust = () => {
  return (
    <section className="py-24 bg-base-200">
      <div className="container mx-auto px-6">
        <div className="bg-base-100 rounded-[3rem] p-8 md:p-16 border border-base-300 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8 leading-tight">
                  Your Safety and Trust <br /> <span className="text-primary italic">Our Priority</span>
                </h2>
                <p className="text-lg text-accent mb-12 leading-relaxed">
                  Building a community requires a foundation of trust. We've built clubSphere
                  with industry-leading security and standards to ensure you can focus on what
                  matters—connecting with people.
                </p>
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {trustItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-[2rem] bg-base-100 border border-base-300 hover:border-primary/20 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-6`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
                  <p className="text-accent text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityTrust;
