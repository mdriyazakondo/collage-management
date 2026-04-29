import { getAllUsers } from "@/app/_actions/users/userService";
import { TUser } from "@/types/users";
import React from "react";

const Users = async () => {
  const users = await getAllUsers();
  console.log(users);

  if (!users) {
    return <div className="text-white">Data load kora sombhob hoyni.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-white">Users List</h1>
      <div className="grid gap-4">
        {users?.data?.map((user: TUser) => (
          <div
            key={user._id}
            className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-white"
          >
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-slate-400">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
