import connectDB from '../../../../utils/connectDB';
import User from '../../../../models/userModel';

export async function POST(request) {
  await connectDB();
  const { email, username } = await request.json();
  const role = 'user';

  if (!email) {
    throw new Error('please provide all values');
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new Error('Email already in use');
  }

  const user = await User.create({ email, username, role });

  if (!user.username || user.username == '') {
    user.username = user.email;
    user.save();
  }

  return new Response(user);
}
