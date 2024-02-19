import User from "@/models/User";
import connectDB from "@/utils/ConnectDB";
import { verifyPassword } from "@/utils/auth";
import { verify } from "jsonwebtoken";

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

  const { name, lastName, password } = req.body;
  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;
  if (token) {
    const result = verify(token, secretKey);
    if (result) {
      const user = await User.findOne({ email: result.email });
      if (user) {
        const isValid = verifyPassword(password, user.password);
        if (isValid) {
          user.name = name;
          user.lastName = lastName;
          user.save();
          return res
            .status(200)
            .json({ status: "success", message: "User Data Updated." });
        } else {
          return res.status(422).json({
            status: "failed",
            message: "Username or password is incorrect.",
          });
        }
      } else {
        return res
          .status(404)
          .json({ status: "failed", message: "User Not found" });
      }
    } else {
      return res
        .status(401)
        .json({ status: "failed", message: "You are unAuthorized." });
    }
  } else {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  res.json({});
}
