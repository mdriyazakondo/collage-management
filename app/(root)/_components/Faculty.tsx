"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import TeacherLightBox from "./TeacherLightBox";
import { useGetTeacherRoleQuery } from "@/redux/service/auth/authApi";
import { TUser } from "@/types/users";

const Faculty: React.FC = () => {
  const role = "teacher";
  const { data, isLoading, error } = useGetTeacherRoleQuery(role);

  const teachers: TUser[] = data?.data || [];

  const [selectedTeacher, setSelectedTeacher] = useState<TUser | null>(null);

  return (
    <section className="py-24 px-4 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900"
          >
            Our Expert <span className="text-primary">Teachers</span>
          </motion.h2>

          <p className="mt-4 text-gray-500 font-medium">
            Learn from the best minds in the industry
          </p>

          <div className="mt-4 w-24 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        {/* LOADING */}
        {isLoading && (
          <p className="text-center text-gray-500">Loading teachers...</p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-500">Failed to load teachers</p>
        )}

        {/* SLIDER */}
        {!isLoading && !error && (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={25}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-16"
          >
            {teachers.map((teacher) => (
              <SwiperSlide key={teacher._id}>
                <motion.div
                  layoutId={`card-${teacher._id}`}
                  onClick={() => setSelectedTeacher(teacher)}
                  className="bg-white rounded-3xl p-6 text-center cursor-pointer shadow hover:shadow-xl transition"
                >
                  {/* IMAGE */}
                  <motion.div
                    layoutId={`img-${teacher._id}`}
                    className="relative w-24 h-24 mx-auto rounded-2xl overflow-hidden mb-5"
                  >
                    <Image
                      src={teacher.images || "/default.png"}
                      alt={teacher.firstName || "Teacher"}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* NAME */}
                  <motion.h3
                    layoutId={`name-${teacher._id}`}
                    className="font-bold text-gray-900"
                  >
                    {teacher.firstName} {teacher.lastName}
                  </motion.h3>

                  {/* DESIGNATION */}
                  <p className="text-xs text-primary font-semibold mt-2">
                    {teacher.designation || "Teacher"}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedTeacher && (
            <TeacherLightBox
              selectedTeacher={{
                name: `${selectedTeacher.firstName} ${selectedTeacher.lastName}`,
                image: selectedTeacher.images || "/default.png",
                description:
                  selectedTeacher.designation ||
                  "Experienced professional teacher",
                socials: selectedTeacher.socials || [],
              }}
              close={() => setSelectedTeacher(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Faculty;
