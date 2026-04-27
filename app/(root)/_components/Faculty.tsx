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
import {
  useGetAllUsersQuery,
  useGetTeacherRoleQuery,
} from "@/redux/service/auth/authApi";
import { TUser } from "@/types/users";

const Faculty: React.FC = () => {
  // ✅ FIXED: RTK Query proper destructure
  const role = "teacher";
  const { data, isLoading, error } = useGetTeacherRoleQuery(role);

  // API safe fallback
  const teachers: TUser[] = data?.data || [];

  const [selectedTeacher, setSelectedTeacher] = useState<TUser | null>(null);

  return (
    <section className="py-24 px-4 bg-gray-50 overflow-hidden faculty-slider">
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

        {/* LOADING STATE */}
        {isLoading && (
          <p className="text-center text-gray-500">Loading teachers...</p>
        )}

        {/* ERROR STATE */}
        {error && (
          <p className="text-center text-red-500">Failed to load teachers</p>
        )}

        {/* SWIPER */}
        {!isLoading && !error && (
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={25}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 group h-full mb-10"
                >
                  {/* IMAGE */}
                  <motion.div
                    layoutId={`img-${teacher._id}`}
                    className="relative w-24 h-24 rounded-2xl overflow-hidden mb-5 ring-4 ring-gray-50 group-hover:ring-primary/10 transition-all shadow-md"
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
                    className="font-bold text-gray-900 text-base leading-tight h-10 flex items-center"
                  >
                    {teacher.firstName} {teacher.lastName}
                  </motion.h3>

                  {/* DESIGNATION */}
                  <p className="text-[10px] text-primary font-bold uppercase mt-2 tracking-widest bg-primary/5 px-3 py-1 rounded-full">
                    {teacher.designation || "Teacher"}
                  </p>

                  {/* INFO */}
                  <div className="mt-5 pt-4 border-t border-gray-50 w-full">
                    <p className="text-xs font-semibold text-gray-400">
                      {teacher.department || "N/A"}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* LIGHTBOX */}
        <AnimatePresence>
          {selectedTeacher && (
            <TeacherLightBox
              selectedTeacher={selectedTeacher}
              close={() => setSelectedTeacher(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Faculty;
