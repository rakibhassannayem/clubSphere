import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    if (name && email && message) {
      toast.success("Thank you for reaching out! We will get back to you soon.");
      form.reset();
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "rakibhassannayem@gmail.com",
      description: "Support reply within 24 hours",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      icon: Phone,
      title: "Call",
      details: "+880 1988242787",
      description: "Mon-Fri from 9am to 6pm",
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      icon: MapPin,
      title: "Visit",
      details: "Dhaka, Bangladesh",
      description: "Come say hello at our office",
      color: "text-red-500",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative py-24 bg-zinc-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-secondary/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-bold mb-6">
              Contact Us
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Let's Start a <span className="text-primary italic">Conversation</span>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl mb-10 leading-relaxed">
              Have a question about our clubs, events, or platform? Our team is
              here to help you build your perfect community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${info.bg} flex items-center justify-center ${info.color} mb-6`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{info.title}</h3>
                <p className="text-secondary font-bold mb-1">{info.details}</p>
                <p className="text-accent text-sm">{info.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-base-200 p-10 md:p-14 rounded-[3rem] border border-base-300"
            >
              <div className="mb-10">
                <h2 className="text-3xl font-black text-secondary mb-4">Send us a message</h2>
                <p className="text-accent">We'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary ml-1">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary ml-1">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-1">Subject</label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    className="w-full px-6 py-4 rounded-2xl bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-1">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Your message here..."
                    className="w-full px-6 py-4 rounded-2xl bg-base-100 border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
                >
                  Send Message <Send className="w-5 h-5" />
                </button>
              </form>
            </motion.div>

            {/* Additional Info & Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-2xl font-black text-secondary mb-6">Why Reach Out?</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">Expert Guidance</h4>
                      <p className="text-accent text-sm">Our community managers can help you set up and grow your club successfully.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">Quick Support</h4>
                      <p className="text-accent text-sm">Technical issues or billing questions? Our support team is available 24/7.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 shrink-0">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-secondary">Partnerships</h4>
                      <p className="text-accent text-sm">Interested in collaborating or integrating with clubSphere? Let's talk business.</p>
                    </div>
                  </div>
                </div>
              </div>  
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
