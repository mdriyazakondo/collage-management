import { getAllUsers } from "@/app/_actions/users/userService";
import { TUser } from "@/types/users";
import React from "react";

type UsersPageProps = {
  searchParams: Promise<{
    search?: string;
    role?: string;
    isActive?: string;
    page?: string;
    limit?: string;
  }>;
};

const Users = async ({ searchParams }: UsersPageProps) => {
  const params = await searchParams;
  const users = await getAllUsers({
    search: params.search,
    role: params.role,
    isActive: params.isActive,
    page: params.page || "1",
    limit: params.limit || "10",
  });

  if (!users) {
    return <div className="text-white">Data load kora sombhob hoyni.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-white">Users List</h1>

      {/* Search / Filter UI */}
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="search"
          placeholder="Search users..."
          defaultValue={params.search}
          className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
        />

        <select
          name="role"
          defaultValue={params.role}
          className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        <select
          name="isActive"
          defaultValue={params.isActive}
          className="px-4 py-2 rounded bg-[#111] text-white border border-gray-700"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
        >
          Apply
        </button>
      </form>

      <div className="grid gap-4">
        {users?.map((user: TUser) => (
          <div
            key={user._id}
            className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-white"
          >
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-slate-400">{user.email}</p>
            <p className="text-sm text-slate-400">Role: {user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
