"use client";
import { useGetAllUsersQuery } from "@/redux/service/auth/authApi";
import { TUser } from "@/types/users";
import {
  Search,
  Mail,
  Shield,
  GraduationCap,
  MapPin,
  Droplet,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const limit = 10;
  const [page, setPage] = useState(1);

  const pathName =
    "?search=" +
    searchTerm +
    "&role=" +
    selectedRole +
    "&page=" +
    page +
    "&limit=" +
    limit;

  const { data: apiResponse, isLoading, error } = useGetAllUsersQuery(pathName);

  const users: TUser[] = apiResponse?.data || [];

  const getRoleBadge = (role: string) => {
    const roles: { [key: string]: string } = {
      admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      user: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      moderator: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };
    return `text-[10px] font-bold px-2 py-0.5 rounded border w-fit uppercase ${
      roles[role.toLowerCase()] ||
      "bg-slate-500/10 text-slate-400 border-slate-500/20"
    }`;
  };

  // Loading state handling
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <p className="animate-pulse">Loading users...</p>
      </div>
    );
  }

  // Error state handling
  if (error) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-red-400">
        <p>Something went wrong! Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-4 md:p-8 text-slate-200">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-slate-400 text-sm">
              Showing {users.length || 0} users in the system
            </p>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              placeholder="Search by name or email..."
              className="bg-[#1E293B] border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500 transition-all w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative border border-slate-700 rounded-lg ">
            <select
              name=""
              id=""
              className="bg-transparent appearance-none py-2 pl-3 pr-8 text-sm focus:outline-none  focus:border-blue-500 transition-all w-full md:w-48 cursor-pointer focus:text-white focus:bg-slate-700"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-xl border border-slate-700 overflow-hidden shadow-2xl ">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#020617]/50 text-slate-500 uppercase text-[10px] font-black tracking-widest border-b border-slate-700">
                  <th className="px-6 py-4 text-nowrap">
                    Soddosho (User Info)
                  </th>
                  <th className="px-6 py-4 text-nowrap">
                    Bibhag (Dept & Role)
                  </th>
                  <th className="px-6 py-4 text-nowrap">Academic Year</th>
                  <th className="px-6 py-4 text-nowrap">Rokto (Blood)</th>
                  <th className="px-6 py-4 text-nowrap text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {users.map((user: TUser) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4 text-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            width={40}
                            height={40}
                            src={
                              user.images ||
                              `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName}`
                            }
                            alt={user.firstName}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-700 border border-slate-600"
                          />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#1E293B] rounded-full"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Mail size={10} /> {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className={getRoleBadge(user.role)}>
                          {user.role}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                          <Shield size={10} className="text-slate-600" />{" "}
                          {user.department}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-nowrap">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <GraduationCap size={14} className="text-blue-500/50" />
                        {user.academicYear}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin size={10} />{" "}
                        {user.presentAddress?.substring(0, 15)}...
                      </div>
                    </td>

                    <td className="px-6 py-4 text-nowrap">
                      <div className="flex items-center gap-1 text-[10px] font-black text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded border border-rose-400/20 w-fit">
                        <Droplet size={10} /> {user.bloodGroup}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-nowrap text-right">
                      <button className="p-2 text-slate-600 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 text-nowrap bg-[#020617]/30 border-t border-slate-800 flex items-center justify-left gap-4">
            <p className="text-[11px] text-slate-500 font-medium italic">
              * Campus Management System theke live data dekhano hocche
            </p>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="p-2 text-slate-600 hover:text-white hover:bg-slate-700 rounded-lg transition-all disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-transparent"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-slate-400">Page {page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={users.length < 2}
                className={`p-2 text-slate-600 hover:text-white hover:bg-slate-700 rounded-lg transition-all disabled:cursor-not-allowed disabled:text-slate-400 disabled:hover:bg-transparent ${users.length < 1 ? "cursor-not-allowed" : ""}`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
