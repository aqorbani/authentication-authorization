import User from "@/models/User";
import connectDB from "@/utils/ConnectDB";
import { verifyPassword } from "@/utils/auth";
import { sign } from "jsonwebtoken";

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
      const isValid = await verifyPassword(password, existingUser.password);

      if (isValid) {
        const secretKey = process.env.SECRET_KEY;
        const expiration = 24 * 60 * 60;
        const token = sign({ email }, secretKey, { expiresIn: expiration });
        console.log(token);
      } else {
        return res
          .status(422)
          .json({ status: "failed", message: "Invalid Name or Password." });
      }
    } else {
      return res
        .status(404)
        .json({ status: "failed", message: "User Not registered!" });
    }
  } else {
    return res.status(402).json({ status: "failed", message: "Invalid Data" });
  }
}
