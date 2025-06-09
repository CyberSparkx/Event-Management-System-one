"use client"
import React from 'react'
import Link from "next/link";
import { useSession ,signOut} from "next-auth/react";

const Nav = () => {
   const {status} = useSession();
   console.log(status);
   
  return (
          <nav className="flex text-white justify-between items-center px-6 py-4 bg-gray-900 shadow-md">
            <h1 className="text-2xl font-bold text-purple-400">EventHub</h1>
            <ul className="flex space-x-6 mt-6  text-lg">
              <li><Link href="http://localhost:3000/"  className="hover:text-purple-400">Home</Link></li>
              <li><Link href="/eventList" className="hover:text-purple-400">Event List</Link></li>
              <li><a href="/dashboard" className="hover:text-purple-400">Dashboard</a></li>
              <li>
             {status === "authenticated" && (
                       <>
                       <button
                           onClick={() => signOut()}
                           className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded transition"
                         >
                           Sign Out
                         </button>
                       </>
                     )}
             {status !== "authenticated" && (
                       <>
                       <button
                           className="w-full bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded transition"
                         >
                          <Link href="/login">Sign In</Link>
                         </button>
                       </>
                     )}
              </li>
            </ul>
          </nav>
  )
}

export default Nav