import connectDB from '../../../../utils/connectDB';
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await connectDB();
  const { email, username } = await request.json();
  const role = 'user';

  if (!email) {
    throw new Error('please provide all values');
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new Error('Email already in use');
  }

  const user = await User.create({ email, username, role });

  if (user) {
    return new NextResponse(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    throw new Error('No user found');
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    throw new Error('Email is missing');
  }

  const user = await User.findOne({ email });

  if (user) {
    return new NextResponse(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}