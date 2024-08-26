import mongoose, { Mongoose } from "mongoose";

const MONGO_URL = process.env.MONGO_URL!;

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null
}

let cached: MongooseConn = (global as any).mongoose; 

if(!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  if(cached.conn) {
    return cached.conn;
  }
  cached.promise = mongoose.connect(MONGO_URL, {
    dbName: "clerk-details",
    bufferCommands: false,
    connectTimeoutMS: 30000
  });
  cached.conn = await cached.promise;

  return cached.conn;
}
