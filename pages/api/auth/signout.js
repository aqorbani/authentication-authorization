import connectDB from "@/utils/ConnectDB";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const serialized = serialize("token", "", { path: "/", maxAge: 0 });
  return res.status(200).setHeader("Set-Cookie", serialized).json({
    status: "success",
    message: "Logged out!",
  });
}
