'use client';
import { useSession } from "next-auth/react";
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Nav from '@/app/Components/Nav';
import { useRouter } from "next/navigation";

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const params = useParams();
  const { data: session, status } = useSession();
   const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/addEvent?_id=${params.id}`);
        setEvent(res.data.event);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    }

    if (params?.id) fetchData();
  }, [params]);

    const register = () => {
  if (status === 'authenticated') {
    const sendEventToServer = async () => {
      try {
        await axios.post('/api/updateEnrolledEvents', {
          email: session.user.email,
          eventId: params.id,
        });
        router.push('/dashboard');
      } catch (err) {
        console.error('Error updating enrolled events:', err);
      }
    };
    sendEventToServer();
  }
};


  if (event === null) return <p className="text-white p-4">Loading...</p>; // show loading
  if (!event) return notFound(); // show 404 only if still null after fetching

  return (
   <>
    <Nav/>
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">{event.title}</h1>
        <p className="text-gray-400">{new Date(event.date).toDateString()}</p>
        <p className="text-gray-400 mb-4">{event.location}</p>
        <p className="mb-6 text-lg text-gray-300">{event.description}</p>

        <h2 className="text-2xl font-semibold text-purple-300 mb-3">Agenda</h2>
        <ul className="list-disc list-inside text-gray-200 space-y-1">
          {event.agenda?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="mt-8">
          <button onClick={register} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white">
            Register Now
          </button>
        </div>
      </div>
    </div>
   </>
  );
};

export default EventDetails;
