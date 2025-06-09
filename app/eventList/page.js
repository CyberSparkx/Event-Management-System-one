"use client"
import Link from "next/link";
import Nav from "../Components/Nav";
import { useEffect, useState } from "react";
import axios from "axios";

const EventList = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/addEvent');
        setEvents(res.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []); 
  return (
   <>
     <Nav/>
    <div className="min-h-screen bg-gray-950 text-white py-10 px-4">
      <h1 className="text-4xl font-bold mb-10 text-center text-purple-400">Upcoming Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <div
            key={event._id}
            className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-purple-500/30 transition"
          >
            <h2 className="text-xl font-semibold text-purple-300">{event.title}</h2>
            <p className="text-sm text-gray-400 mt-2">{new Date(event.date).toDateString()}</p>
            <p className="text-sm text-gray-400">{event.location}</p>
            <p className="mt-4 text-gray-300 line-clamp-3">{event.description}</p>
            <Link href={`/eventList/${event._id}`}>
              <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div> 
   </>
  );
};

export default EventList;
