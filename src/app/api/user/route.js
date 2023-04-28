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

{
  /*
  
  export default async function handler(req, res) {
  const requestMethod = req.method;
  await connectDB();
  switch (requestMethod) {
    case 'GET':
      res.status(200).json({ message: 'Get user' });
      break;

    case 'POST':
      const { email, username } = req.body;
      const role = 'user';
      console.log('req.body', req.body);
      console.log('email', email);

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

      res.status(200).json(user);
      break;

    case 'PUT':
      res.status(200).json({ message: 'Update user' });
      break;

    case 'POST':
      res.status(200).json({ message: 'Delete user' });
      break;

    default:
      // Handle unsupported method
      res.status(405).json({ message: 'Method Not Allowed' });
      break;
  }
}
  
  
  */
}
