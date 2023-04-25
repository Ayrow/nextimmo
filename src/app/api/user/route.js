import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();
  switch (req.method) {
    case 'GET':
      res.status(200).json({ message: 'Get user' });
      break;

    case 'POST':
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
