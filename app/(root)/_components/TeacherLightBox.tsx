"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { TUser } from "@/types/users";

/* 🔹 Socials type */
interface Socials {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  instagram?: string;
}

/* 🔹 Teacher type */
export interface Teacher {
  id?: string;
  _id?: string;

  name: string;
  image: string;

  department: string;
  designation?: string;
  experience?: string;

  description: string;

  socials: Socials;
}

/* 🔹 Props */
interface TeacherLightBoxProps {
  selectedTeacher: Teacher | TUser;
  close: () => void;
}

const TeacherLightBox: React.FC<TeacherLightBoxProps> = ({
  selectedTeacher,
  close,
}) => {
  // Helper function to get name from either Teacher or TUser type
  const getTeacherName = (): string => {
    if ("name" in selectedTeacher) {
      return selectedTeacher.name;
    } else if ("firstName" in selectedTeacher) {
      const firstName = selectedTeacher.firstName || "";
      const lastName = selectedTeacher.lastName || "";
      return `${firstName} ${lastName}`.trim();
    }
    return "Teacher";
  };

  // Helper function to get image from either Teacher or TUser type
  const getTeacherImage = (): string => {
    if ("image" in selectedTeacher) {
      return selectedTeacher.image;
    } else if ("images" in selectedTeacher) {
      return selectedTeacher.images;
    }
    return "/default.png";
  };

  // Helper function to get socials (only available in Teacher type)
  const getSocials = (): Socials | undefined => {
    if ("socials" in selectedTeacher) {
      return selectedTeacher.socials;
    }
    return undefined;
  };

  // Helper function to get experience (only available in Teacher type)
  const getExperience = (): string => {
    if ("experience" in selectedTeacher) {
      return selectedTeacher.experience || "N/A";
    }
    return "N/A";
  };

  // Helper function to get description (only available in Teacher type)
  const getDescription = (): string => {
    if ("description" in selectedTeacher) {
      return selectedTeacher.description;
    }
    return "No description available";
  };

  const teacherId =
    selectedTeacher._id || (selectedTeacher as any).id || "unknown";
  const teacherName = getTeacherName();
  const teacherImage = getTeacherImage();
  const socials = getSocials();
  const experience = getExperience();
  const description = getDescription();
  const designation = (selectedTeacher as any).designation || "Teacher";
  const department = selectedTeacher.department || "Department";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        layoutId={`card-${teacherId}`}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={close}
          className="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-600 rounded-full p-2 transition-all"
        >
          ✕
        </button>

        <div className="p-8 flex flex-col items-center">
          {/* IMAGE */}
          <motion.div
            layoutId={`img-${teacherId}`}
            className="relative w-36 h-36 rounded-3xl overflow-hidden mb-6 shadow-xl ring-4 ring-primary/5"
          >
            <Image
              src={teacherImage}
              alt={teacherName}
              width={400}
              height={400}
              className="object-cover"
            />
          </motion.div>

          {/* NAME */}
          <motion.h2
            layoutId={`name-${teacherId}`}
            className="text-3xl font-bold text-gray-900 mb-1"
          >
            {teacherName}
          </motion.h2>

          <p className="text-primary font-bold text-lg">{designation}</p>

          <p className="text-gray-500 font-medium mb-5">{department}</p>

          {/* SOCIALS */}
          <div className="flex gap-4 mb-8">
            <SocialIcon
              href={socials?.facebook || "#"}
              icon={<FaFacebookF />}
              color="hover:bg-[#1877F2]"
            />

            <SocialIcon
              href={socials?.linkedin || "#"}
              icon={<FaLinkedinIn />}
              color="hover:bg-[#0A66C2]"
            />

            <SocialIcon
              href={socials?.email ? `mailto:${socials.email}` : "#"}
              icon={<FaEnvelope />}
              color="hover:bg-orange-500"
            />

            <SocialIcon
              href={socials?.twitter || "#"}
              icon={<FaTwitter />}
              color="hover:bg-[#1DA1F2]"
            />
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4 w-full mb-6">
            <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                Experience
              </p>
              <p className="text-xl font-black text-gray-800">{experience}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                Position
              </p>
              <p className="text-sm font-bold text-gray-800 mt-1 uppercase">
                {(designation || "").split(" ")[0] || "N/A"}
              </p>
            </div>
          </div>

          {/* BIO */}
          <div className="text-left w-full bg-primary/5 p-5 rounded-2xl border border-primary/10 relative">
            <span className="absolute -top-3 left-6 bg-primary text-white text-[10px] px-3 py-1 rounded-full font-bold">
              FACULTY BIO
            </span>

            <p className="text-gray-700 text-sm leading-relaxed italic">
              &quot;{description}&quot;
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* 🔹 Social Icon */
interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  color: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-xl transition-all duration-300 hover:text-white hover:shadow-lg ${color} hover:-translate-y-1`}
  >
    {icon}
  </a>
);

export default TeacherLightBox;
