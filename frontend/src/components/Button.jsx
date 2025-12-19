import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  to, 
  ...props
}) => {
  const styles = {
    primary:
      "bg-gold text-soft-white hover:bg-opacity-90 border border-deep-brown",
    secondary:
      "bg-transparent text-gold border border-gold hover:bg-gold hover:text-soft-white",
  };

 
  const classNames = `py-3 px-8 rounded-full font-body font-semibold transition-all duration-300 ${styles[variant]} ${className}`;
 

  // Check if 'to' prop is passed then it should be a link 
  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block" 
      >
        <Link to={to} className={classNames} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={classNames}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;