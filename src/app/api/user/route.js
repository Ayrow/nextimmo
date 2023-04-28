import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case 'GET':
      res.status(200).json({ message: 'Get user' });
      break;

    case 'POST':
      const { email, username } = req.body;

      if (!email) {
        throw new Error('please provide all values');
      }

      const userAlreadyExists = await User.findOne({ email });
      if (userAlreadyExists) {
        throw new Error('Email already in use');
      }

      if (!username || username == '') {
        username = email;
      }

      await User.create({ email, username });
      res.status(200).json({ message: 'Create user' });
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
