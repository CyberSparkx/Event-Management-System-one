"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "../Components/Nav";
import axios from "axios";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const router = useRouter();
const [role, setRole] = useState("user");
const [enrolledEvents, setenrolledEvents] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchRole = async () => {
      if (session?.user?.email) {
        try {
         const res = await axios.get(`/api/userss?email=${session.user.email}`);

          setRole(res.data.role);
          setenrolledEvents(res.data.enrolledEvents);
          
        } catch (error) {
          console.error("Failed to fetch role:", error);
        }
      }
    };

    fetchRole();
  }, [session]);


  const [eventList, setEventList] = useState("");

    
  useEffect(() => {
  const fetchData = async () => {
    try {
      const promises = enrolledEvents.map(async (eventId) => {
        const res = await axios.get(`/api/addEvent?_id=${eventId}`);
        return res.data.event; // ✅ should work if backend returns `event`
      });

      const events = await Promise.all(promises);
      setEventList(events); 
    } catch (error) {
      console.error('Error fetching event list:', error);
    }
  };

  if (enrolledEvents.length > 0) {
    fetchData();
  }
}, [enrolledEvents]);


  const handleDelete = async (eventId) => {
  try {
    if (status === 'authenticated') {
      const userEmail = session.user.email;

      // Update enrolled events (remove event from user)
      await axios.delete(
        `/api/updateEnrolledEvents?email=${userEmail}&eventId=${eventId}`
      );

      // Delete the event itself if you're an admin
      const res = await axios.delete(`/api/addEvent?_id=${eventId}`);

      if (res.status === 200) {
        // Remove from UI
        setEventList((prev) => prev.filter((event) => event._id !== eventId));
      } else {
        console.error('Failed to delete event:', res.data.message);
      }
    }
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};


 

  const goToDashboard = () => {
    router.push("/dashboard/add"); 
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">Dashboard</h1>
          {role === "admin" && (
            <button
              onClick={() => {
                goToDashboard();
                alert("Redirect to add event form");
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
            >
              + Add Event
            </button>
          )}
        </div>

        {eventList.length === 0 ? (
          <p className="text-gray-400">No events found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventList.map((event) => (
              <div
                key={event._id}
                className="bg-gray-900 p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold text-purple-300">
                  {event.title}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(event.date).toDateString()}
                </p>
                <p className="text-gray-400 text-sm">{event.location}</p>
                <p className="mt-4 text-gray-300 text-sm">
                  {event.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/eventList/${event.id}`}
                    className="text-sm text-purple-400 hover:underline"
                  >
                    View Details
                  </Link>
                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-sm text-red-400 hover:text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
