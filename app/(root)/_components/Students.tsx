"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Student } from "@/types/Student";
import StudentLightBox from "./StudentLightBox";
import { useGetTeacherRoleQuery } from "@/redux/service/auth/authApi";

const Students: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const role = "student";

  // API theke data fetch hocche
  const { data: apiResponse, isLoading, error } = useGetTeacherRoleQuery(role);

  // API data-ke amader UI-r format (Student type) e convert kora
  const formattedStudents = useMemo(() => {
    if (!apiResponse?.data) return [];

    return apiResponse.data.map((item: any) => ({
      id: item._id, // MongoDB _id use kora hoyeche
      name: `${item.firstName} ${item.lastName}`,
      image: item.images || "https://via.placeholder.com/400", // Fallback image
      role: item.role,
      batch: item.academicYear || "N/A",
      major: item.department,
      idNumber: item.studen_id || "N/A",
      achievements: item.bloodGroup
        ? `Blood Group: ${item.bloodGroup}`
        : "Active Learner",
      description: `Student of ${item.department}. Joined on ${new Date(item.createdAt).toLocaleDateString()}.`,
      socials: {
        facebook: "#",
        linkedin: "#",
        github: "#",
        email: item.email,
      },
    }));
  }, [apiResponse]);

  if (isLoading)
    return (
      <div className="py-24 text-center">Loading Brilliant Students...</div>
    );
  if (error)
    return (
      <div className="py-24 text-center text-red-500">
        Failed to load students.
      </div>
    );

  return (
    <section className="py-24 px-4 bg-gray-50 overflow-hidden student-slider relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900"
          >
            Our <span className="text-blue-600">Brilliant Students</span>
          </motion.h2>
          <div className="mt-4 w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
        </div>

        {/* Swiper Slider */}
        <div className="relative group">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={25}
            slidesPerView={1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-20 px-4"
          >
            {formattedStudents.map((student: Student) => (
              <SwiperSlide key={student.id} className="py-4">
                <motion.div
                  layoutId={`student-card-${student.id}`}
                  onClick={() => setSelectedStudent(student)}
                  className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl cursor-pointer border border-gray-100 p-8 flex flex-col items-center text-center transition-all duration-500 group h-full"
                >
                  {/* Image */}
                  <motion.div
                    layoutId={`student-img-${student.id}`}
                    className="relative w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-gray-50 group-hover:ring-blue-100 transition-all duration-500 shadow-md"
                  >
                    <Image
                      src={student.image}
                      alt={student.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </motion.div>

                  <motion.h3
                    layoutId={`student-name-${student.id}`}
                    className="font-bold text-gray-900 text-xl leading-tight mb-2"
                  >
                    {student.name}
                  </motion.h3>

                  <p className="text-[11px] text-blue-600 font-bold uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full mb-6">
                    {student.batch}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 w-full space-y-1">
                    <p className="text-sm font-semibold text-gray-500">
                      {student.major}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                      ID: {student.idNumber}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <AnimatePresence>
          {selectedStudent && (
            <StudentLightBox
              student={selectedStudent}
              close={() => setSelectedStudent(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Students;
