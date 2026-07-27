import React from "react";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  GitHub,
  Email,
  Phone,
  LocationOn,
  Send,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="mt-24 bg-[#08141F] text-white">

      {/* Top Section */}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10">

          {/* Brand */}

          <div className="lg:col-span-2">

            <h1 className="text-4xl font-black tracking-wide">

              <span className="text-emerald-400">
                Nex
              </span>

              Cart

            </h1>

            <p className="mt-5 text-gray-400 leading-8 max-w-md">

              NexCart is a next-generation multi-vendor marketplace
              built for modern shopping. Discover premium products,
              trusted sellers and secure online payments — all in
              one place.

            </p>

            {/* Newsletter */}

            <div className="mt-8">

              <h3 className="font-semibold text-lg">
                Stay Updated
              </h3>

              <div className="mt-4 flex overflow-hidden rounded-xl bg-white">

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 outline-none text-gray-800"
                />

                <button
                  className="bg-emerald-500 hover:bg-emerald-600 transition px-5"
                >
                  <Send />
                </button>

              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h2 className="text-xl font-bold mb-6">
              Explore
            </h2>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Categories
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Today's Deals
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                AI Assistant
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Become Seller
              </li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h2 className="text-xl font-bold mb-6">
              Company
            </h2>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-emerald-400 cursor-pointer transition">
                About Us
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Careers
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Blog
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Press
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Contact
              </li>

            </ul>

          </div>

          {/* Support */}

          <div>

            <h2 className="text-xl font-bold mb-6">
              Support
            </h2>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Help Center
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Privacy Policy
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Terms & Conditions
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Refund Policy
              </li>

              <li className="hover:text-emerald-400 cursor-pointer transition">
                Shipping Policy
              </li>

            </ul>

          </div>

        </div>
                {/* Contact */}

        <div className="mt-14 border-t border-white/10 pt-10">

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Contact */}

            <div>

              <h2 className="text-xl font-bold mb-5">
                Contact Us
              </h2>

              <div className="space-y-4 text-gray-400">

                <div className="flex items-center gap-3">
                  <LocationOn className="text-emerald-400" />
                  <span>Noida, Uttar Pradesh, India</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-emerald-400" />
                  <span>+91 98765 43210</span>
                </div>

                <div className="flex items-center gap-3">
                  <Email className="text-emerald-400" />
                  <span>support@nexcart.in</span>
                </div>

              </div>

            </div>

            {/* Social */}

            <div>

              <h2 className="text-xl font-bold mb-5">
                Follow Us
              </h2>

              <div className="flex gap-4">

                {[
                  <Facebook />,
                  <Instagram />,
                  <Twitter />,
                  <LinkedIn />,
                  <GitHub />,
                ].map((icon, index) => (
                  <div
                    key={index}
                    className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-emerald-500 hover:scale-110 hover:border-emerald-500"
                  >
                    {icon}
                  </div>
                ))}

              </div>

              <p className="text-gray-500 mt-5 text-sm leading-7">

                Follow NexCart on social media to stay updated
                with new features, offers and product launches.

              </p>

            </div>

            {/* Trust */}

            <div>

              <h2 className="text-xl font-bold mb-5">
                Why NexCart?
              </h2>

              <div className="space-y-3 text-gray-400">

                <p>✔ Trusted Sellers</p>

                <p>✔ Secure Payments</p>

                <p>✔ AI Shopping Assistant</p>

                <p>✔ Fast Delivery</p>

                <p>✔ Easy Returns</p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">

            © {new Date().getFullYear()} <span className="font-semibold text-white">NexCart</span>.
            All Rights Reserved.

          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">

            <span className="hover:text-emerald-400 cursor-pointer transition">
              Privacy
            </span>

            <span className="hover:text-emerald-400 cursor-pointer transition">
              Terms
            </span>

            <span className="hover:text-emerald-400 cursor-pointer transition">
              Cookies
            </span>

            <span className="hover:text-emerald-400 cursor-pointer transition">
              Sitemap
            </span>

          </div>

          <p className="text-sm text-gray-500">
            Built with <span className="text-red-500">❤</span> in India
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;