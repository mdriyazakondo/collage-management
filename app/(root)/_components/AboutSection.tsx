"use client";

import React from "react";
import { motion, Variants } from "framer-motion"; // Ekhene Variants import kora hoyeche
import { HiOutlineLightBulb, HiOutlineBadgeCheck } from "react-icons/hi";
import { BiBuildingHouse, BiSupport } from "react-icons/bi";

const AboutSection = () => {
  // Animation Variants - Explicitly typed as Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left Side: Visual Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="w-full lg:w-1/2 grid grid-cols-2 gap-6 relative"
          >
            {/* Decorative Background */}
            <motion.div
              animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-50 rounded-3xl -z-0 hidden lg:block"
            ></motion.div>

            <div className="space-y-6 z-10">
              <motion.div
                variants={imageVariants}
                whileHover={{ y: -10 }}
                className="h-72 bg-blue-900 rounded-[2rem] flex flex-col items-center justify-center text-white p-8 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-yellow-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="text-5xl font-black mb-3 relative z-10">
                  25+
                </span>
                <p className="text-blue-100 text-center font-bold uppercase tracking-[0.2em] text-[10px] relative z-10">
                  Years of Excellence
                </p>
              </motion.div>

              <motion.div
                variants={imageVariants}
                whileHover={{ y: -10 }}
                className="h-56 bg-white border-2 border-slate-100 rounded-[2rem] p-8 flex items-center justify-center shadow-xl group transition-colors hover:border-yellow-500"
              >
                <BiBuildingHouse
                  size={70}
                  className="text-blue-900 group-hover:text-yellow-500 transition-colors duration-300"
                />
              </motion.div>
            </div>

            <div className="space-y-6 pt-16 z-10">
              <motion.div
                variants={imageVariants}
                whileHover={{ y: -10 }}
                className="h-56 bg-yellow-500 rounded-[2rem] p-8 flex items-center justify-center shadow-xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-blue-900/10 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <HiOutlineBadgeCheck
                  size={70}
                  className="text-white relative z-10"
                />
              </motion.div>

              <motion.div
                variants={imageVariants}
                whileHover={{ y: -10 }}
                className="h-72 bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-white p-8 shadow-2xl text-center group"
              >
                <span className="text-5xl font-black mb-3 group-hover:text-yellow-500 transition-colors">
                  150+
                </span>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                  Expert Faculty
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Content Area */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="w-full lg:w-1/2 space-y-10"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[2px] bg-yellow-500"></span>
                <h4 className="text-yellow-600 font-black uppercase tracking-[0.3em] text-xs">
                  About Our Institution
                </h4>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-blue-900 leading-[1.1] tracking-tighter">
                Excellence in <br />
                <span className="text-yellow-500">Education.</span>
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-500 leading-relaxed font-medium"
            >
              Our system provides a robust digital infrastructure designed to
              bridge the gap between traditional learning and modern management.
              We prioritize efficiency, student growth, and administrative
              transparency.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-yellow-500 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                  <HiOutlineLightBulb size={24} />
                </div>
                <div>
                  <h5 className="font-black text-blue-900 uppercase text-sm tracking-tight">
                    Innovative Vision
                  </h5>
                  <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase leading-relaxed">
                    Leading with technology-driven academic strategies.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col gap-4 p-8 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 hover:border-blue-900 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  <BiSupport size={24} />
                </div>
                <div>
                  <h5 className="font-black text-blue-900 uppercase text-sm tracking-tight">
                    24/7 Support
                  </h5>
                  <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase leading-relaxed">
                    Dedicated helpdesk for students and staff queries.
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="pt-10 flex flex-wrap items-center gap-8 border-t border-slate-100"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-blue-900 text-white font-black rounded-full hover:bg-yellow-600 transition-all shadow-xl uppercase text-[10px] tracking-[0.2em]"
              >
                Read Our Story
              </motion.button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                <div>
                  <p className="text-sm font-black text-blue-900 uppercase tracking-tight">
                    Dr. Robert Harrison
                  </p>
                  <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest">
                    Vice Chancellor
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
