/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userLogout } from "../features/userAuthSlice";
import {LogOut } from "lucide-react";
 
const navContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Rooms", path: "/rooms" },
    { title: "My Account", path: "/account" },
    { title: "Contact", path: "/contact" },
  ];

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 },
    },
    exit: { x: "100%", transition: { duration: 0.3 } },
  };

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };

  return (
    <>
      <motion.nav
        animate={{
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "#F7F2E7",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed w-full top-0 z-50 transition-shadow backdrop-blur-md shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/" className="text-5xl font-heading text-deep-brown">
                Serenity
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              className="hidden md:flex items-center space-x-2"
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Page Links */}
              {navLinks.map((link) => (
                <motion.div
                  key={link.title}
                  variants={navItemVariants}
                  className="relative"
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative z-10 block px-4 py-2 font-body font-medium transition-colors ${
                        isActive
                          ? "text-deep-brown"
                          : "text-deep-brown hover:text-gold"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.title}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 z-[-10] bg-soft-white border border-gold rounded-3xl shadow-sm"
                            layoutId="active-pill"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              {/* AUTH BUTTONS (Desktop) */}
              <motion.div variants={navItemVariants} className="pl-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center relative z-10 px-4 py-2 font-body font-medium bg-transparent text-deep-brown hover:text-gold"
                >
                  Sign Out <LogOut size={20} className="ms-3 text-deep-brown hover:text-gold"/>
                </button>
                
              </motion.div>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(true)} className="text-deep-brown">
                <FaBars size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-beige p-6 z-50 md:hidden "
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-3xl font-heading text-gold">Serenity</span>
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes size={24} className="text-deep-brown" />
                </button>
              </div>
              <div className="flex flex-col bg-soft-white space-y-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.title}
                    to={link.path}
                    className={({ isActive }) =>
                      `text-2xl  font-body ${
                        isActive ? "text-gold" : "text-deep-brown"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </NavLink>
                ))}

                {/* AUTH BUTTONS (for Mobile) */}
                <div className="pt-6 border-t border-gold/20">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-2xl font-body text-deep-brown"
                  >
                    Sign Out
                  </button>
                  <LogOut size={20}/>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;