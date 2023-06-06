import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../utils/connectDB';
import User, { IUserDocument } from '../../../../models/userModel';

type RegexFilter = {
  $regex: string;
  $options: string;
};

type QueryObjectType = {
  username?: RegexFilter;
  email?: RegexFilter;
  role?: string;
};

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const email = searchParams.get('email');
  const role = searchParams.get('role');

  const queryObject: QueryObjectType = {};

  if (username) {
    queryObject.username = { $regex: username, $options: 'i' };
  }

  if (email) {
    queryObject.email = { $regex: email, $options: 'i' };
  }

  if (role) {
    queryObject.role = role;
  }

  const sort = searchParams.get('sort');

  let result = User.find(queryObject).lean();

  if (sort === 'plus récent') {
    result = result.sort({ createdAt: 1 });
  } else if (sort === 'plus ancien') {
    result = result.sort({ createdAt: -1 });
  } else if (sort === 'A-Z') {
    result = result.sort({ username: 1 });
  } else if (sort === 'Z-A') {
    result = result.sort({ username: -1 });
  }

  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 20;
  const skip = (page - 1) * limit;

  const allUsers = (await result
    .skip(skip)
    .limit(limit)
    .exec()) as IUserDocument[];
  const totalUsersFound = await User.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalUsersFound / limit);

  if (allUsers) {
    return new NextResponse(
      JSON.stringify({ allUsers, totalUsersFound, numOfPages }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } else {
    throw new Error('No listing found');
  }
}
