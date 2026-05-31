import mongoose from 'mongoose';
import dns from 'dns';

const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI?.startsWith('mongodb+srv://')) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  if (MONGODB_URI.includes('<db_password>')) {
    throw new Error('Replace <db_password> in .env.local with your MongoDB Atlas database user password');
  }

  if (cached.conn) {
    console.log('[v0] Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    console.log('[v0] Creating new MongoDB connection');
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('[v0] MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        console.error('[v0] MongoDB connection error:', error.message);
        if (error.message.includes('querySrv')) {
          throw new Error(
            'MongoDB Atlas SRV DNS lookup failed. Your network/DNS is blocking _mongodb._tcp.cluster0.hefokq3.mongodb.net. Try another DNS/network or use a non-SRV MongoDB connection string from Atlas.'
          );
        }
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('[v0] Failed to connect to MongoDB:', e.message);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
