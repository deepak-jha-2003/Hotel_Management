import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/DMV Logo.png";   

const Footer = () => {
  return (
    <footer className="bg-deep-brown text-beige p-10 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-heading text-gold mb-4">Serenity</h3>
          <p className="font-body text-sm">
            Experience Comfort, Luxury & Serenity.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg text-soft-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 font-body text-sm">
            <li><Link to="/rooms" className="hover:text-gold">Rooms</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/account" className="hover:text-gold">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-lg text-soft-white mb-4">
            Contact Us
          </h4>
          <p className="font-body text-sm">123 Luxury Lane, Jaipur, IN</p>
          <p className="font-body text-sm">info@serenity.com</p>
          <p className="font-body text-sm">+91 123 456 7890</p>
        </div>
        <div>
          <h4 className="font-heading text-lg text-soft-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-beige hover:text-gold"><FaFacebook size={20} /></a>
            <a href="#" className="text-beige hover:text-gold"><FaInstagram size={20} /></a>
            <a href="#" className="text-beige hover:text-gold"><FaTwitter size={20} /></a>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-center text-center md:text-right mt-8 pt-8 border-t border-gold/20 text-sm font-body">
               
        <p className="mt-4 md:mt-0">
          © {new Date().getFullYear()} Serenity Hotels. All rights reserved.
        </p>

        <div className="flex items-center gap-2 text-left">

        <img className="h-8 w-8 border rounded-3xl border-white"src={logo} alt="DMV Logo"/>
         <p className="text-md"> Powered by{" "} <a href="https://dmvcoretech.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-orange-500 hover:underline">DMV CoreTech</a>
        </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;