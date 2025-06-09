import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import userModel from '../../Models/userModel';

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


export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ role: user.role, enrolledEvents:user.enrolledEvents }, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching role:', error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}


// POST - Create a new user
export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, email, profilePhoto,enrolledEvents } = body;

    if (!name || !email) {
      return NextResponse.json({ message: 'Missing name or email' }, { status: 400 });
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      const newUser = await userModel.create({ name, email, profilePhoto,enrolledEvents });
      return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
    }

    return NextResponse.json({ message: 'User already exists' }, { status: 200 });
  } catch (error) {
    console.error('❌ Server error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
  }
}
