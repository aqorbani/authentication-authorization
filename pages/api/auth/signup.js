import User from "@/models/User";
import connectDB from "@/utils/ConnectDB";
import { hashPassword } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
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

  if (req.body.email && req.body.password) {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(402)
        .json({ status: "failed", message: "User exist already!" });
    } else {
      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({
        email: email,
        password: hashedPassword,
      });
      return res
        .status(201)
        .json({ status: "success", message: "User Created." });
    }
  } else {
    return res.status(402).json({ status: "failed", message: "Invalid Data" });
  }
}
