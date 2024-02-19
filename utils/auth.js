import { verify } from "jsonwebtoken";

const { hash, compare } = require("bcrypt");

async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

function verifyToken(token, secretKey) {
  try {
    const result = verify(token, secretKey);
    if (result.email) {
      return { email: result.email };
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export { hashPassword, verifyPassword, verifyToken };
