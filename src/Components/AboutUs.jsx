import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="text-center mx-auto">
      <motion.h2

      className="text-3xl font-bold text-[#363446] mb-4"
      initial={{ opacity: 0, y: -20}}
      animate={{ opacity: 1, y: 0}}
      transition={{ duration: 0.5}}
      
      >About Us</motion.h2>
      <motion.p

      className="text-[#716c93] text-lg leading-relaxed"
      initial={{ opacity: 0, y: 10}}
      animate={{ opacity:1, y:0}}
      transition={{ duration: 0.6, delay: 0.2}}
      
      >
        GR Product Hunt is a platform designed for tech enthusiasts to discover,
        share, and showcase innovative tech products, including Web Apps, AI
        Tools, Software, Games, and more. We aim to connect creators and users,
        fostering a community passionate about technology and innovation.
      </motion.p>
    </div>
  );
};

export default AboutUs;
