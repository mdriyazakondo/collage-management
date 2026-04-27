"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Camera,
  ArrowRight,
  Loader2,
  Phone,
  ShieldCheck,
  Briefcase,
  MapPin,
} from "lucide-react";
import { uploadToCloudinary } from "@/utils/upload";
import { IRegisterInput } from "@/types/Signup";
import { useCreateUserMutation } from "@/redux/service/auth/authApi";
import Swal from "sweetalert2";

const RegisterForm: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [createUser, { isLoading, error, isSuccess }] = useCreateUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterInput>({
    defaultValues: {
      role: "student",
      gender: "male",
    },
  });

  const selectedRole = watch("role");

  // ✅ Submit handler
  const onSubmit: SubmitHandler<IRegisterInput> = async (data) => {
    try {
      let imageUrl = "";

      // 🔥 upload file (FIXED)
      if (file) {
        const res = await uploadToCloudinary(file);
        imageUrl = res || "";
      }

      const finalData = {
        ...data,
        images: imageUrl,
      };

      console.log("FINAL DATA:", finalData);

      const res = await createUser(finalData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Registration Successful 🎉",
        text: "Your account has been created!",
        timer: 2000,
        showConfirmButton: false,
      });
      console.log("SUCCESS:", res);
    } catch (err) {
      console.error("FAILED:", err);
    }
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none bg-slate-50 text-slate-700";

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-10 text-center text-white">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-slate-400 mt-2">Fill all required information</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 md:p-12 space-y-10"
        >
          {/* PROFILE IMAGE */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border overflow-hidden bg-slate-100 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera size={36} className="text-slate-300" />
                )}
              </div>

              <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer text-white">
                <Camera size={16} />

                {/* ✅ FIXED FILE INPUT */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;

                    setFile(f);

                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setImagePreview(reader.result as string);

                    reader.readAsDataURL(f);
                  }}
                />
              </label>
            </div>
          </div>

          {/* BASIC INFO */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 border-b pb-2">
              <ShieldCheck size={18} />
              <h2 className="font-bold text-sm uppercase">
                Account Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className={inputStyle}
              />
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className={inputStyle}
              />
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className={inputStyle}
              />
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className={inputStyle}
              />
              <input
                type="date"
                {...register("dateOfBirth", { required: true })}
                className={inputStyle}
              />
              <select {...register("gender")} className={inputStyle}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </section>

          {/* CONTACT */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 border-b pb-2">
              <Phone size={18} />
              <h2 className="font-bold text-sm uppercase">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                {...register("contactNo", { required: true })}
                placeholder="Contact No"
                className={inputStyle}
              />
              <input
                {...register("emergencyContactNo", { required: true })}
                placeholder="Emergency Contact"
                className={inputStyle}
              />
              <select {...register("bloodGroup")} className={inputStyle}>
                <option value="">Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ),
                )}
              </select>
            </div>
          </section>

          {/* ROLE */}
          <section className="bg-indigo-50 p-6 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-indigo-700">
              <Briefcase size={18} />
              <h2 className="font-bold text-sm uppercase">
                Professional Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select {...register("role")} className={inputStyle}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>

              <input
                {...register("department", { required: true })}
                placeholder="Department"
                className={inputStyle}
              />

              {selectedRole === "student" && (
                <>
                  <input
                    {...register("studen_id")}
                    placeholder="Student ID"
                    className={inputStyle}
                  />
                  <select {...register("academicYear")} className={inputStyle}>
                    <option value="1st year">1st year</option>
                    <option value="2nd year">2nd year</option>
                    <option value="3rd year">3rd year</option>
                    <option value="4th year">4th year</option>
                    <option value="masters">Masters</option>
                  </select>
                </>
              )}

              {selectedRole === "teacher" && (
                <input
                  {...register("designation")}
                  placeholder="Designation"
                  className={inputStyle}
                />
              )}
            </div>
          </section>

          {/* ADDRESS */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 border-b pb-2">
              <MapPin size={18} />
              <h2 className="font-bold text-sm uppercase">Address</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <textarea
                {...register("presentAddress", { required: true })}
                placeholder="Present Address"
                className={inputStyle}
              />
              <textarea
                {...register("permanentAddress", { required: true })}
                placeholder="Permanent Address"
                className={inputStyle}
              />
            </div>
          </section>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-5 rounded-xl font-bold flex justify-center items-center gap-3"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Complete Registration <ArrowRight size={18} />
              </>
            )}
          </button>

          {error && (
            <p className="text-red-500 text-center text-sm">
              Registration failed
            </p>
          )}

          {isSuccess && (
            <p className="text-green-600 text-center text-sm">
              Registration successful!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
