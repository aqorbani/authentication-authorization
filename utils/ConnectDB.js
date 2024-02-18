import mongoose from "mongoose";

export default async function connectDB() {
  //Connect to DB

  if (mongoose.connections[0].readyState) return;

  mongoose.set("strictQuery", false);
  await mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
}
