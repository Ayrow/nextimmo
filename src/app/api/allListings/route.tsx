import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../utils/connectDB';
import Listing from '../../../../models/listingModel';

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);

  const statut = searchParams.get('statut');

  console.log('statut', statut);

  const allListings = await Listing.find();

  if (allListings) {
    return new NextResponse(JSON.stringify(allListings), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    throw new Error('No listing found');
  }
}
