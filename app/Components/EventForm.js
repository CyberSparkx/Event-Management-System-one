'use client';
import axios from 'axios';
import React, { useState } from 'react';

const EventForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    date: initialData?.date || '',
    location: initialData?.location || '',
    description: initialData?.description || '',
    agenda: initialData?.agenda?.join('\n') || '', // multiline string
  });

  const [error, setError] = useState('');

  const handleChange =  (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const { title, date, location, description, agenda } = formData;

  if (!title || !date || !location || !description) {
    setError('Please fill all required fields.');
    return;
  }

  const agendaList = agenda
    .split('\n')
    .map(item => item.trim())
    .filter(item => item !== '');

  const finalData = {
    ...formData,
    agenda: agendaList,
  };
  

  try {
    setError('');
    const res = await axios.post('/api/addEvent', {
      title:finalData.title,
      date:finalData.date,
      location:finalData.location,
      description:finalData.description,
      agenda:finalData.agenda,

    });
    onSubmit?.(finalData); // optional: update UI or close form
  } catch (err) {
    console.error('Error posting data:', err);
    setError('Something went wrong while submitting.');
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 text-white p-6 rounded-xl shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-purple-400">
        {initialData ? 'Edit Event' : 'Add New Event'}
      </h2>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Location *</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-300">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm text-gray-300">Agenda (one item per line)</label>
        <textarea
          name="agenda"
          value={formData.agenda}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded text-white font-medium"
      >
        {initialData ? 'Update Event' : 'Add Event'}
      </button>
    </form>
  );
};

export default EventForm;
