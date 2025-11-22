import UserSchema from "@/schema/user.schema";
import { NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";

const getToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return {
    accessToken,
    refreshToken,
  };
};
export const POST = async (request) => {
  console.log("login requestff");
  try {
    const { email, password } = await request.json();
    console.log(email, password);
    const user = await UserSchema.findOne({ email });

    console.log(user);

    if (!user)
      return res.json(
        { success: false, message: "User does not exists" },
        { status: 404 }
      );

    const isLogin = await bcrypt.compare(password, user.password);

    if (!isLogin)
      return res.json(
        { success: false, message: "Incorrect Password" },
        { status: 401 }
      );

    const token = getToken({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    });

    const result = res.json({ success: true });

    result.cookies.set("accessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.PROD === "true" ? true : false,
      path: "/",
    });
    result.cookies.set("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.PROD === "true" ? true : false,
      path: "/",
    });
    return result;
  } catch (err) {
    console.log(err);
    return res.json({ success: false }, { status: 500 });
  }
};
