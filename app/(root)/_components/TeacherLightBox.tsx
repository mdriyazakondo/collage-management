"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

type Social = {
  platform: string;
  url: string;
};

type Teacher = {
  name: string;
  image: string;
  description: string;
  socials: Social[];
};

type Props = {
  selectedTeacher: Teacher;
  close: () => void;
};

const TeacherLightBox = ({ selectedTeacher, close }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={close}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-md w-full relative"
      >
        {/* CLOSE */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* IMAGE */}
        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-6">
          <Image
            src={selectedTeacher.image}
            alt={selectedTeacher.name}
            fill
            className="object-cover"
          />
        </div>

        {/* INFO */}
        <h2 className="text-xl font-bold text-center">
          {selectedTeacher.name}
        </h2>

        <p className="text-sm text-gray-500 text-center mt-3">
          {selectedTeacher.description}
        </p>

        {/* SOCIALS */}
        {selectedTeacher.socials.length > 0 && (
          <div className="flex justify-center gap-4 mt-6">
            {selectedTeacher.socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                className="text-primary text-sm font-semibold"
              >
                {social.platform}
              </a>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TeacherLightBox;
