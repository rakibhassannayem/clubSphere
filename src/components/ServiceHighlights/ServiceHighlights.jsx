import { motion } from "framer-motion";
import {
  CalendarRange,
  CreditCard,
  Users2,
  BarChart3,
  MessagesSquare,
  MailCheck
} from "lucide-react";

const services = [
  {
    title: "Event Booking",
    desc: "Seamless registration for both free and paid events with instant ticket generation.",
    icon: CalendarRange,
    color: "bg-blue-500",
  },
  {
    title: "Member Management",
    desc: "Comprehensive dashboard for managers to track applications, attendance, and activity.",
    icon: Users2,
    color: "bg-emerald-500",
  },
  {
    title: "Secure Payments",
    desc: "Integrated Stripe payments for membership fees and event tickets with automatic history.",
    icon: CreditCard,
    color: "bg-purple-500",
  },
  {
    title: "Analytics & Reports",
    desc: "Detailed insights into club growth, event success, and community engagement metrics.",
    icon: BarChart3,
    color: "bg-orange-500",
  },
  {
    title: "In-App Discussions",
    desc: "Direct communication channels between managers and members for every club.",
    icon: MessagesSquare,
    color: "bg-rose-500",
  },
  {
    title: "Automated Alerts",
    desc: "Instant email and in-app notifications for upcoming events and club announcements.",
    icon: MailCheck,
    color: "bg-amber-500",
  },
];

const ServiceHighlights = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            Powerful Tools for <br /> <span className="text-primary leading-tight">Vibrant Communities</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-accent"
          >
            We provide a complete suite of services designed to take the friction out of
            community management so you can focus on building meaningful connections.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-1 rounded-[2.5rem] bg-base-200 border border-base-300 hover:border-primary/30 transition-all duration-300"
            >
              <div className="p-8 h-full flex flex-col">
                <div className={`${service.color} w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-current/20`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{service.title}</h3>
                <p className="text-accent leading-relaxed flex-grow">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
