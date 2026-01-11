import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from "react-router";

const blogs = [
  {
    id: 1,
    title: "10 Tips for Managing a Successful Photography Club",
    excerpt: "Learn how to keep your members engaged and your photo walks organized with these expert tips.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
    date: "Jan 10, 2026",
    author: "Alex Rivera",
  },
  {
    id: 2,
    title: "Why In-Person Connections Matter in a Digital Age",
    excerpt: "Exploring the psychological benefits of joining local interest-based clubs and communities.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
    date: "Jan 05, 2026",
    author: "Morgan Smith",
  },
  {
    id: 3,
    title: "Finding Your Passion: A Guide for New Club Members",
    excerpt: "Not sure which club to join? Here's how to identify your interests and find your perfect group.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    date: "Dec 28, 2025",
    author: "Jordan Lee",
  },
];

const BlogSection = () => {
  return (
    <section className="py-24 bg-base-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-secondary mb-4"
            >
              Latest from Our Blog
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-accent"
            >
              Tips, stories, and insights from the heart of our community.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-base-100 rounded-[2.5rem] overflow-hidden border border-base-300 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-primary shadow-sm">
                    Resources
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-6 text-sm text-accent mb-4 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {blog.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {blog.author}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors duration-300">
                  {blog.title}
                </h3>
                <p className="text-accent text-sm leading-relaxed mb-8 flex-grow">
                  {blog.excerpt}
                </p>

                <Link
                  to="/"
                  className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all duration-300"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
