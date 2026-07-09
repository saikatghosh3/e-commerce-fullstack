import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI is not defined. Go to https://vercel.com/docs/storage/vercel-postgres/quickstart or set it in your Vercel environment variables.'
    );
  }

  if (MONGODB_URI.includes('<db_password>')) {
    throw new Error(
      'Replace <db_password> in .env.local with your actual MongoDB Atlas database user password, then re-deploy.'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      })
      .catch((error) => {
        if (error.message.includes('querySrv') || error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
          throw new Error(
            'MongoDB Atlas DNS lookup failed. Your Vercel deployment cannot reach MongoDB. ' +
            'Make sure Network Access in MongoDB Atlas allows connections from anywhere (0.0.0.0/0) ' +
            'and the connection string is correct in Vercel environment variables.'
          );
        }
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
