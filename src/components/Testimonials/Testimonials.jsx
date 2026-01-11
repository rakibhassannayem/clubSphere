import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Photography Club Manager",
    image: "https://i.pravatar.cc/150?u=sarah",
    content: "clubSphere has completely transformed how I manage my photography group. The event tracking and member communication tools are top-notch!",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Tech Enthusiast",
    image: "https://i.pravatar.cc/150?u=david",
    content: "Finding a local coding community was so hard until I found clubSphere. Now I'm part of three different tech clubs and love every bit of it.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Hiking Group Leader",
    image: "https://i.pravatar.cc/150?u=elena",
    content: "The registration process for our hiking events is now seamless. No more messy spreadsheets or missed payments. Highly recommended!",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-base-200 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4 fill-current" />
            Trusted by 10,000+ members
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-secondary mb-4"
          >
            What Our Community Says
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-base-200 p-8 rounded-[2.5rem] border border-base-300 relative group"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors duration-300" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20">
                  <img src={testi.image} alt={testi.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-secondary">{testi.name}</h3>
                  <p className="text-sm text-accent">{testi.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(testi.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-accent italic leading-relaxed">
                "{testi.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
