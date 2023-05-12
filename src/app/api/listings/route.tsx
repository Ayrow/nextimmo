import connectDB from '../../../../utils/connectDB';
import Listing from '../../../../models/listingModel';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await connectDB();
  console.log('request.json()', request.json());
}

export async function GET(request: NextRequest) {
  await connectDB();
}
