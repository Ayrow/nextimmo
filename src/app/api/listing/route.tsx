import connectDB from '../../../../utils/connectDB';
import Listing from '../../../../models/listingModel';
import { NextRequest, NextResponse } from 'next/server';
import User from '../../../../models/userModel';

export async function POST(request: NextRequest) {
  await connectDB();
  const { values, email } = await request.json();
  if (!email) {
    throw new Error('Un compte est nécessaire pour ajouter une annonce');
  }

  if (!values) {
    throw new Error('Veuillez remplir les champs obligatoires');
  }

  const user = await User.findOne({ email });

  values.createdBy = user._id;

  if (user.role === 'user') {
    throw new Error('Seuls les admins et agents peuvent ajouter une annonce');
  }

  const listing = await Listing.create(values);
  if (listing) {
    return new NextResponse(JSON.stringify(listing), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    throw new Error("L'annonce existe déjà");
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
  const { searchParams } = new URL(request.url);
  const ref = searchParams.get('ref');

  if (!ref) {
    throw new Error('No listing here');
  }

  const listing = await Listing.findOne({ ref });

  if (listing) {
    await Listing.deleteOne({ ref });
    return new NextResponse(JSON.stringify(listing), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    throw new Error('No listing found');
  }
}

export async function PATCH(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get('listingId');
  const { values, email } = await request.json();

  if (!email) {
    throw new Error('Il faut un compte pour modifier une annonce');
  }

  if (!values) {
    throw new Error('Des champs requis sont manquants');
  }

  const user = await User.findOne({ email });
  // values.updatedBy = user._id;

  if (user.role === 'user') {
    throw new Error('Seuls les agents ou admin peuvent modifier une annonce');
  } else {
    const listing = await Listing.findByIdAndUpdate({ _id: listingId }, values);
    if (listing) {
      return new NextResponse(JSON.stringify(listing), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error(
        `Il y a eu une erreur lors de la mise ajour de l'annonce: ${values.ref}`
      );
    }
  }
}
