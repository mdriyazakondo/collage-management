"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaTimes,
  FaIdCard,
  FaGraduationCap,
  FaTrophy,
} from "react-icons/fa";
import { Student } from "@/types/Student";

interface Props {
  student: Student;
  close: () => void;
}

const StudentLightBox: React.FC<Props> = ({ student, close }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Background Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal Content */}
      <motion.div
        layoutId={`student-card-${student.id}`}
        className="relative bg-white w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border border-white/20"
      >
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-6 right-6 p-2.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-all duration-300 z-20 shadow-sm"
        >
          <FaTimes size={18} />
        </button>

        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side: Image Section */}
          <motion.div
            layoutId={`student-img-${student.id}`}
            className="relative w-full md:w-5/12 h-80 md:h-auto overflow-hidden"
          >
            <Image
              src={student.image}
              alt={student.name}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay for Image (Mobile) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />
          </motion.div>

          {/* Right Side: Details Section */}
          <div className="p-8 md:p-12 flex-1 bg-white relative">
            <motion.div layoutId={`student-name-${student.id}`}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                {student.name}
              </h2>
            </motion.div>

            <div className="flex items-center gap-2 mt-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase rounded-full border border-blue-100">
                {student.batch}
              </span>
              <span className="text-gray-400 text-sm font-medium">
                — {student.major}
              </span>
            </div>

            <div className="mt-8 space-y-6">
              {/* Achievement */}
              <div className="flex gap-4">
                <div className="mt-1 text-blue-500">
                  <FaTrophy size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Achievements & Info
                  </h4>
                  <p className="text-gray-700 font-semibold leading-snug">
                    {student.achievements}
                  </p>
                </div>
              </div>

              {/* About */}
              <div className="flex gap-4">
                <div className="mt-1 text-blue-500">
                  <FaGraduationCap size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Background
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{student.description}"
                  </p>
                </div>
              </div>

              {/* ID Number */}
              <div className="flex gap-4">
                <div className="mt-1 text-blue-500">
                  <FaIdCard size={16} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">
                    Institutional ID
                  </h4>
                  <p className="text-gray-900 font-mono font-bold text-lg bg-gray-50 px-3 py-1 rounded-lg inline-block border border-gray-100">
                    {student.idNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links & CTA */}
            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                {[
                  {
                    icon: FaFacebook,
                    link: student.socials.facebook,
                    color: "hover:bg-blue-600",
                  },
                  {
                    icon: FaLinkedin,
                    link: student.socials.linkedin,
                    color: "hover:bg-blue-700",
                  },
                  {
                    icon: FaGithub,
                    link: student.socials.github,
                    color: "hover:bg-gray-900",
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-50 text-gray-400 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:text-white ${social.color}`}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>

              <a
                href={`mailto:${student.socials.email}`}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                <FaEnvelope /> Contact Student
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLightBox;
