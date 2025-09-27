import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function ConnectDB() {
  if (cached.conn) {
    return cached.conn; // reuse existing connection
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false }; // ✅ correct key

    cached.promise = mongoose
      .connect(`${process.env.MONGODB_URI}/Quick-Chart`, opts)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default ConnectDB;
