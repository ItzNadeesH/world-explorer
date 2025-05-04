"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/app/actions/auth";

const Header = () => {
  return (
    <div className="h-16">
      <div className="flex items-center justify-between w-full h-full px-5 border-b border-gray-300 max-w-7xl mx-auto">
        <div className="font-semibold">
          <Link href="/">World Explorer</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/favorites"
            className="flex h-10 w-10 items-center hover:bg-gray-100 rounded-full border border-gray-200 transition-all"
          >
            <Image
              src="/favorite.svg"
              alt="logo"
              width={16}
              height={16}
              className="mx-auto -mb-[2px]"
            />
          </Link>
          <UserDropDown />
        </div>
      </div>
    </div>
  );
};

const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignout = async () => {
    await logout();
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="h-10 w-10 inline-flex justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer"
        >
          <Image src="/user.svg" alt="logo" width={24} height={24} className="mx-auto" />
        </button>
      </div>

      <div
        className={`absolute right-0 z-10 mt-2 min-w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden transition ease-out duration-200 transform ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-1">
          <div className="block px-4 py-2 text-xs text-black border-b border-gray-100">
            <p>Signed in as</p>
            <p>nadeesh@gmail.com</p>
          </div>
          <Link
            href="/settings"
            className="block px-4 py-2 font-semibold text-sm text-gray-700 hover:bg-gray-100"
          >
            Account settings
          </Link>

          <button
            onClick={handleSignout}
            type="submit"
            className="block w-full px-4 py-2 text-left font-semibold text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
