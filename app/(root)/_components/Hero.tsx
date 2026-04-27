"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/Button/Button";

const Hero = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[90vh] w-full overflow-hidden">
      <video
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          className="px-4 py-1 text-xs sm:text-sm font-medium text-accent bg-accent/20 rounded-full backdrop-blur-sm flex items-center justify-center  gap-2"
        >
          <div className="h-3 w-3 bg-accent rounded-full"></div>
          <span> Your Gateway to Success</span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-snug"
        >
          Discover Your Path to a <br />
          <span className="text-accent">Brighter Tomorrow.</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 sm:mt-4 max-w-xs sm:max-w-lg md:max-w-xl text-white/80 text-sm sm:text-base md:text-lg"
        >
          At [College Name], we don&apos;t just teach; we inspire. Explore a
          vibrant campus life, diverse courses, and a supportive community
          designed to help you thrive in an ever-changing world.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-3 sm:mt-6"
        >
          <Button>Get Started</Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
