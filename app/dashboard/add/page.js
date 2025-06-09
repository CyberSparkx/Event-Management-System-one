'use client';
import { useRouter } from 'next/navigation';
import EventForm from '../../Components/EventForm';

const AddEventPage = () => {
  const router = useRouter();

  

  const handleAdd = (data) => {
    // Replace this with POST to MongoDB/your API
    console.log("New Event Submitted:", data);
    alert("Event added successfully!");
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-6">
      <EventForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddEventPage;
