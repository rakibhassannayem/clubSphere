import { motion } from "framer-motion";
import { Camera, Mountain, Music, Laptop, Trophy, Palette, Book, Coffee } from "lucide-react";
import { Link } from "react-router";

const categories = [
  { name: "Photography", icon: Camera, color: "text-rose-500" },
  { name: "Sports", icon: Trophy, color: "text-orange-500" },
  { name: "Tech", icon: Laptop, color: "text-amber-500" },
  { name: "Music", icon: Music, color: "text-blue-500" },
  { name: "Outdoor", icon: Mountain, color: "text-emerald-500" },
];

const Categories = () => {
  return (
    <section className="py-24 bg-base-200">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            Explore by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-accent"
          >
            Find your next community by browsing through our most popular categories. <br className="hidden md:block" />
            There's something for everyone.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
            >
              <div className="bg-base-100 p-8 rounded-[2rem] border border-base-300 hover:border-primary/50 transition-all duration-300 text-center relative overflow-hidden h-full flex flex-col items-center justify-center hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500"></div>

                <cat.icon className={`w-12 h-12 mb-4 ${cat.color} group-hover:scale-110 transition-transform duration-300 relative z-10`} />
                <h3 className="text-lg font-bold text-secondary relative z-10">{cat.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
