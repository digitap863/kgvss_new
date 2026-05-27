import mongoose, { type Mongoose } from "mongoose";

declare global {
  var mongooseConnection:
    | {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      }
    | undefined;
}

export function hasMongoConfig() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectMongoose(): Promise<Mongoose> {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB ?? "kgvss";

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  globalThis.mongooseConnection ??= {
    conn: null,
    promise: null,
  };

  if (globalThis.mongooseConnection.conn) {
    return globalThis.mongooseConnection.conn;
  }

  globalThis.mongooseConnection.promise ??= mongoose.connect(uri, {
    dbName,
    bufferCommands: false,
  });

  globalThis.mongooseConnection.conn =
    await globalThis.mongooseConnection.promise;

  return globalThis.mongooseConnection.conn;
}
