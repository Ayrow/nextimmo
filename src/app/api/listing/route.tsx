import connectDB from '../../../../utils/connectDB';
import Listing from '../../../../models/listingModel';
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import User from '../../../../models/userModel';

export async function POST(request: NextRequest) {
  await connectDB();
  const { values, email } = await request.json();

  if (!email) {
    throw new Error('You need an account to add listing');
  }

  if (!values) {
    throw new Error('please fill in all the mandatory fields');
  }

  const user = await User.findOne({ email });

  values.createdBy = user._id;

  if (user.role === 'user') {
    throw new Error('Only admin or agent can add listing');
  } else {
    await Listing.create(values);
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');

  if (!ref) {
    throw new Error('No listing here');
  }

  const listing = await Listing.findOne({ ref });

  if (listing) {
    return new NextResponse(JSON.stringify(listing), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  //
}
