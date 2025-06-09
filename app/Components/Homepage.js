'use client';
import React from 'react';

import Nav from './Nav';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
     <Nav/>
      {/* Hero Section */}
      <section className="flex h-[91.5vh] flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Plan, Promote & Manage <br /> Your Events Effortlessly
        </h2>
        <p className="text-lg md:text-xl max-w-2xl text-gray-300 mb-8">
          EventHub helps you create seamless event experiences. From registrations to reminders — we have got you covered.
        </p>
        <a
          href="/login"
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 text-lg rounded-xl transition duration-300"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};

export default HomePage;
