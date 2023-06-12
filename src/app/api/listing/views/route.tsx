import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../../utils/connectDB';
import Listing from '../../../../../models/listingModel';

export async function PATCH(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get('listingId');
  const valueChange = searchParams.get('valueChange');

  const listing = await Listing.findById({ _id: listingId });

  if (valueChange === 'increment') {
    listing.nbVues += 1;
    await listing.save();
  } else if (valueChange === 'reset') {
    listing.nbVues = 0;
    await listing.save();
  }

  return new NextResponse(JSON.stringify(listing), {
    headers: { 'Content-Type': 'application/json' },
  });
}
