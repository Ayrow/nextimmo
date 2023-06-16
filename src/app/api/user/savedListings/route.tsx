import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../../utils/connectDB';
import User from '../../../../../models/userModel';
import Listing from '../../../../../models/listingModel';

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
