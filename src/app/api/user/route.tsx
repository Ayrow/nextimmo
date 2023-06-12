import connectDB from '../../../../utils/connectDB';
import User from '../../../../models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import Listing from '../../../../models/listingModel';

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

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const update = searchParams.get('update');

  const { newUserData, listingId, combinedSeenListingsArray } =
    await request.json();

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new Error('No user found');
  }

  if (newUserData) {
    const { email, username, role } = newUserData;
    user.email = email;
    user.username = username;
    user.role = role;

    user.save();
    return new NextResponse(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const updateListingsArray = async ({ type }) => {
    const listing = await Listing.findOne({ _id: listingId });
    if (user[type].includes(listing._id)) {
      user[type].pull(listing._id);
      await user.save();
      //  listing[update] -= 1;
      //  await listing.save();
    } else {
      user[type].addToSet(listing._id);
      await user.save();
      //listing[update] += 1;
      // await listing.save();
    }
  };

  if (listingId && update === 'nbAjoutFavoris') {
    updateListingsArray({ type: 'saved' });
  } else if (update === 'nbVues') {
    if (listingId) {
      const listing = await Listing.findOne({ _id: listingId });
      if (!user.alreadySeen.includes(listing._id)) {
        user.alreadySeen.addToSet(listing._id);
        await user.save();
        //   listing[update] += 1;
        //   await listing.save();
      }
    } else if (combinedSeenListingsArray) {
      user.alreadySeen = combinedSeenListingsArray;
      await user.save();
    }
  }

  return new NextResponse(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  });
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
