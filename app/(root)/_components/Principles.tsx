"use client";

import React from "react";
import { motion, Variants, Transition } from "framer-motion"; // Transition ইমপোর্ট করা হয়েছে
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineArrowUpRight,
} from "react-icons/hi2";

const Principals = () => {
  // ১. ভেরিয়েন্টের জন্য সঠিক টাইপ সেট করা হয়েছে
  const fadeIn: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
  };

  // ২. transition-এর জন্য "as const" ব্যবহার করা হয়েছে যাতে TypeScript ভ্যালু লক করে দেয়
  // অথবা সরাসরি Transition টাইপ ব্যবহার করা যায়
  const transitionSettings: Transition = {
    duration: 0.8,
    ease: "easeOut",
  };

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          {/* Left Side: Profile Area */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            {/* Decorative Frame */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-yellow-500 z-0"
            ></motion.div>

            <div className="relative z-10 aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-all duration-500"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-slate-300 font-black uppercase tracking-[0.3em]">
                  Principal Portrait
                </span>
              </div>

              {/* Hover-driven Info Card */}
              <motion.div
                whileHover={{ y: -10 }}
                className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-xl border-b-4 border-yellow-500"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-blue-900 text-2xl">
                      Dr. Alexander Sterling
                    </h4>
                    <p className="text-sm text-yellow-600 font-bold uppercase tracking-widest mt-1">
                      Executive Principal
                    </p>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 cursor-pointer"
                  >
                    <HiOutlineArrowUpRight size={20} />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Message Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={transitionSettings} // এখানে আর এরর আসবে না
              className="relative"
            >
              <HiOutlineChatBubbleLeftRight
                size={120}
                className="absolute -top-16 -left-10 text-slate-100/80 -z-10"
              />
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[2px] bg-yellow-500"></span>
                <h4 className="text-yellow-600 font-bold uppercase tracking-widest text-xs">
                  Institutional Leadership
                </h4>
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-blue-900 leading-[1.1] tracking-tighter">
                Fostering <br />
                <span className="text-yellow-500">Academic Purity.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-xl text-slate-700 font-medium leading-relaxed italic border-l-4 border-slate-100 pl-6">
                "Our mission is to cultivate an environment where innovation
                meets tradition, ensuring students excel in a global economy."
              </p>

              <p className="text-slate-500 leading-loose text-lg">
                Since the inception of this department, we have focused on
                building a robust management framework that ensures every
                student receives seamless support.
              </p>

              {/* Animated Stats */}
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-slate-100">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <h5 className="text-3xl font-black text-blue-900">
                    A+ Rating
                  </h5>
                  <p className="text-xs font-bold text-slate-400 uppercase mt-1">
                    Global Standard
                  </p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <h5 className="text-3xl font-black text-blue-900">
                    25+ Years
                  </h5>
                  <p className="text-xs font-bold text-slate-400 uppercase mt-1">
                    Institutional Legacy
                  </p>
                </motion.div>
              </div>

              {/* Button & Socials with Hover Effects */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-900 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg transition-colors"
                >
                  View Full Bio
                </motion.button>

                <div className="flex items-center gap-3">
                  {[
                    { icon: <FaLinkedinIn />, key: "ln" },
                    { icon: <FaTwitter />, key: "tw" },
                  ].map((social) => (
                    <motion.a
                      key={social.key}
                      href="#"
                      whileHover={{
                        y: -5,
                        borderColor: "#1e3a8a",
                        color: "#1e3a8a",
                      }}
                      className="w-12 h-12 rounded-full border-2 border-slate-100 text-slate-400 flex items-center justify-center transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Principals;
