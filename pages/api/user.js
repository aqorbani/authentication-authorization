import { verifyToken } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;

  if (token) {
    const result = verifyToken(token, secretKey);
    if (result) {
      return res.status(200).json({ status: "success", data: result });
    } else {
      return res
        .status(401)
        .json({ status: "failed", message: "You are unAuthorized!" });
    }
  } else {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  res.json({});
}
