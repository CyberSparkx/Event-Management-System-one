// app/api/addEvent/route.js

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import eventDataModel from '@/app/Models/eventDataModel'; // Adjust the path if needed
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
 if (mongoose.connection.readyState === 0) {
     await mongoose.connect(MONGO_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     console.log('✅ MongoDB connected');
   }
};


export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('_id');

    if (eventId) {
      const event = await eventDataModel.findById(eventId);
      if (!event) {
        return NextResponse.json({ message: 'Event not found' }, { status: 404 });
      }
      return NextResponse.json({ event }, { status: 200 });
    }

    // If no ID is passed, return all events
    const events = await eventDataModel.find();
    return NextResponse.json({ events }, { status: 200 });

  } catch (error) {
    console.error('❌ Error fetching event(s):', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, date, location, description, agenda } = body;

    const newEvent = await eventDataModel.create({
      title,
      date,
      location,
      description,
      agenda,
    });

    return NextResponse.json(
      { message: 'Event created', event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}



export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('_id');

    if (!id) {
      return NextResponse.json({ message: 'Missing event ID' }, { status: 400 });
    }

    const deleted = await eventDataModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('❌ Error deleting event:', error);
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}
