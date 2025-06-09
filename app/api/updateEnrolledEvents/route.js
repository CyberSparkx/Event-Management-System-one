import { NextResponse } from 'next/server';
import userModel from '../../Models/userModel';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection function
async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');
  }
}
 
export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { email, eventId } = body;

    if (!email || !eventId) {
      return NextResponse.json({ message: 'Missing email or eventId' }, { status: 400 });
    }

    // Push the eventId into the enrolledEvents array only if it doesn't already exist
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $addToSet: { enrolledEvents: eventId } }, // avoids duplicates
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event added', user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}



export async function DELETE(req) {
  try {
    await     await connectToDatabase();


    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const eventId = searchParams.get('eventId');

    if (!email || !eventId) {
      return NextResponse.json({ message: 'Missing email or eventId' }, { status: 400 });
    }

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      { $pull: { enrolledEvents: eventId } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event removed from enrolledEvents', user: updatedUser }, { status: 200 });

  } catch (error) {
    console.error('❌ Error removing event from enrolledEvents:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}