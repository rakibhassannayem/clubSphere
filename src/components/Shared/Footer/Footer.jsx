import Logo from "../Logo/Logo";
import { Link } from "react-router";
import {
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="p-10 bg-zinc-900 text-white">
      <footer className="footer sm:footer-horizontal">
        {/* Column 1: About */}
        <aside className="max-w-xs">
          <Link to={"/"} className="flex items-center gap-1 mb-4">
            <Logo></Logo>
          </Link>
          <p className="text-zinc-400 text-base leading-relaxed">
            Discover, join, and manage local clubs. Connect with like-minded
            people and build meaningful communities in your area.
          </p>
        </aside>

        {/* Column 2: Quick Links */}
        <nav className="text-zinc-400">
          <h6 className="footer-title text-white opacity-100">Quick Links</h6>
          <Link to={"/clubs"} className="link link-hover hover:text-primary transition-colors">
            Browse Clubs
          </Link>
          <Link to={"/events"} className="link link-hover hover:text-primary transition-colors">
            Upcoming Events
          </Link>
          <Link to={"/about"} className="link link-hover hover:text-primary transition-colors">
            About Us
          </Link>
          <Link to={"/contact"} className="link link-hover hover:text-primary transition-colors">
            Contact Us
          </Link>
        </nav>

        {/* Column 3: Social Links */}
        <nav className="text-zinc-400">
          <h6 className="footer-title text-white opacity-100">Contact</h6>
          <div className="flex gap-3">
            <a
              href="https://www.linkedin.com/in/rakibhassannayem/"
              className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              title="LinkedIn"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/rakibhassannayem"
              className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              title="GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/rhnayem23"
              className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
              title="Facebook"
            >
              <FiFacebook className="w-5 h-5" />
            </a>
          </div>
        </nav>
      </footer>
      {/* Contact Info */}
      <div className="flex flex-col justify-center items-center mt-12 pt-8 border-t border-accent">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4 text-accent">
          <a href="mailto:rakibhassannayem@gmail.com" className="flex items-center gap-2 hover:text-primary transition">
            <FiMail className="w-4 h-4" />
            <span>rakibhassannayem@gmail.com</span>
          </a>
          <a href="tel:+8801988242787" className="flex items-center gap-2 hover:text-primary transition">
            <FiPhone className="w-4 h-4" />
            <span>+880 1988242787</span>
          </a>
          <div className="flex items-center gap-2">
            <FiMapPin className="w-4 h-4" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-left text-accent">
          © {new Date().getFullYear()} ClubSphere. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
