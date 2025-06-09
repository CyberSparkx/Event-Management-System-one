"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react"; // install lucide-react if not already

const Nav = () => {
  const { status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-400">EventHub</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg items-center">
          <li><Link href="https://event-management-system-one-nu.vercel.app/" className="hover:text-purple-400">Home</Link></li>
          <li><Link href="/eventList" className="hover:text-purple-400">Event List</Link></li>
          <li><Link href="/dashboard" className="hover:text-purple-400">Dashboard</Link></li>
          <li>
            {status === "authenticated" ? (
              <button
                onClick={() => signOut()}
                className="bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded transition"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/login">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition">
                  Sign In
                </button>
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link href="/" className="block hover:text-purple-400" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/eventList" className="block hover:text-purple-400" onClick={() => setIsOpen(false)}>Event List</Link>
          <Link href="/dashboard" className="block hover:text-purple-400" onClick={() => setIsOpen(false)}>Dashboard</Link>
          {status === "authenticated" ? (
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded transition"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition"
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Nav;
