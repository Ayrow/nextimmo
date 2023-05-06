import mongoose, { ConnectOptions } from 'mongoose';

interface IConnection {
  isConnected: boolean;
}

const connection: IConnection = {
  isConnected: false,
};

async function connectDB(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  connection.isConnected = db.connections[0].readyState === 1;
  console.log('MongoDB connected!');
}

export default connectDB;
