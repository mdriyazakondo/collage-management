"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineAcademicCap,
  HiOutlineUserCircle,
  HiOutlineMenuAlt3,
} from "react-icons/hi";

import { BiBell } from "react-icons/bi";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/event" },
    { name: "Blog", href: "/blog" },
    { name: "Library", href: "/library" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="w-full bg-white border-b-4 border-blue-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-350 mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-blue-900 rounded-lg text-white group-hover:bg-yellow-500 transition-colors">
            <HiOutlineAcademicCap size={32} />
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-bold text-blue-900 uppercase">
              Edu<span className="text-yellow-600">Sync</span>
            </h1>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-[15px] font-semibold transition-all duration-300 pb-1
                                        ${
                                          isActive
                                            ? "text-blue-900"
                                            : "text-slate-500 hover:text-blue-900"
                                        }`}
                >
                  {link.name}

                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-500 rounded-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all">
            <BiBell size={24} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
          </button>

          <Link
            href={"/auth/sign_in"}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-yellow-600 text-white text-sm font-bold rounded-md hover:bg-yellow-700 transition-all shadow-md"
          >
            <HiOutlineUserCircle size={20} />
            Login
          </Link>

          <button className="lg:hidden p-2 text-blue-900">
            <HiOutlineMenuAlt3 size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
