import connectDB from '../../../../utils/connectDB';
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await connectDB();
  const { email, username } = await request.json();

  if (!email) {
    throw new Error('please provide all values');
  }

  let role = 'user';

  const allUsers = await User.find();

  if (!allUsers) {
    role = 'admin';
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

export async function PATCH(request: NextRequest) {
  await connectDB();
  const { userToEdit } = await request.json();
  const { email, username, role, _id } = userToEdit;

  const user = await User.findOne({ _id });

  if (user) {
    user.email = email;
    user.username = username;
    user.role = role;
    user.save();
    return new NextResponse(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    throw new Error('No user found');
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  const user = await User.findOne({ email });

  if (user) {
    await User.deleteOne({ user });

    return new NextResponse('User deleted', {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    throw new Error('No user found');
  }
}
