import React from "react";
import Logo from "../Logo/Logo";
import { Link } from "react-router";
import { FiFacebook, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="p-10 bg-zinc-900 text-white">
      <footer className="footer sm:footer-horizontal">
        <aside>
          <Link to={"/"} className="flex items-center gap-1">
            <Logo></Logo>
            <p className="text-3xl font-bold">
              Club<span className="text-primary">Sphere</span>
            </p>
          </Link>
          <p className="text-accent text-base">
            Discover, join, and manage local clubs. Connect with <br />
            like-minded people and build meaningful communities <br />
            in your area.
          </p>
          {/* social links */}
          <div className="flex gap-2">
            <a
              href="https://www.facebook.com/rhnayem23"
              className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center hover:bg-primary transition"
            >
              <FiFacebook className="w-5 h-5" />
            </a>

            <a
              href="https://x.com/rhnayem23"
              className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center hover:bg-primary transition"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>

            <a
              href="https://www.instagram.com/rhnayem23"
              className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center hover:bg-primary transition"
            >
              <FaInstagram className="w-5 h-5" />
            </a>

            <a
              href="https://www.linkedin.com/in/rakibhassannayem/"
              className="w-10 h-10 rounded-lg bg-accent/30 flex items-center justify-center hover:bg-primary transition"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
          </div>
        </aside>
        <nav className="text-accent">
          <h6 className="footer-title text-white">Discover</h6>
          <Link to={"/clubs"} className="link link-hover">
            Browse Clubs
          </Link>
          <Link to={"/events"} className="link link-hover">
            Upcoming Events
          </Link>
          <Link className="link link-hover">Popular Categories</Link>
          <Link className="link link-hover">How It Works</Link>
        </nav>
        <nav className="text-accent">
          <h6 className="footer-title text-white">For Managers</h6>
          <Link className="link link-hover">Create a Club</Link>
          <Link className="link link-hover">Club Manager Guide</Link>
          <Link className="link link-hover">Pricing</Link>
          <Link className="link link-hover">Success Stories</Link>
        </nav>
        <nav className="text-accent">
          <h6 className="footer-title text-white">Support</h6>
          <Link className="link link-hover">Help Center</Link>
          <Link className="link link-hover">Contact Us</Link>
          <Link className="link link-hover">Privacy Policy</Link>
          <Link className="link link-hover">Terms of Service</Link>
        </nav>
      </footer>
      {/* Contact Info */}
      <div className="mt-12 pt-8 border-t border-background/10">
        <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-8 text-accent">
          <div className="flex items-center gap-2">
            <FiMail className="w-4 h-4" />
            <span>rakibhassannayem@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FiPhone className="w-4 h-4" />
            <span>+880 1988242787</span>
          </div>
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
