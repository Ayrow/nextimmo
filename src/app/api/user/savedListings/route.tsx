import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../../utils/connectDB';
import User from '../../../../../models/userModel';
import Listing from '../../../../../models/listingModel';

export async function POST(request: NextRequest) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const listingId = searchParams.get('listingId');

  const user = await User.findOne({ _id: userId });

  const updateListingsArray = async ({ type }) => {
    const listing = await Listing.findOne({ _id: listingId });
    if (user[type].includes(listing._id)) {
      user[type].pull(listing._id);
      await user.save();
    } else {
      user[type].addToSet(listing._id);
      await user.save();
    }
  };

  if (listingId) {
    await updateListingsArray({ type: 'saved' });
  }

  return new NextResponse(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const user = await User.findOne({ _id: userId });
  const savedListings = user.saved;

  const listings = await Listing.find({ _id: savedListings });

  if (user) {
    return new NextResponse(JSON.stringify(listings), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
