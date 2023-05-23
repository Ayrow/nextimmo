import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../utils/connectDB';
import User from '../../../../models/userModel';

export async function GET(request: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role');

  if (role === 'user') {
    const allBasicUsers = await User.find().where({ role: 'user' });
    if (allBasicUsers) {
      return new NextResponse(JSON.stringify(allBasicUsers), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('No users found');
    }
  } else {
    const agentsAdminUsers = await User.find()
      .where('role')
      .all(['agent', 'admin']);
    return new NextResponse(JSON.stringify(agentsAdminUsers), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
