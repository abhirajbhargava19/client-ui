import "@/lib/db";
import UserSchema from "@/schema/user.schema";
import { NextResponse as res } from "next/server";

export const GET = () => {
  return res.json({ success: true });
};

export const POST = async (request) => {
  try {
    console.log("SignUp POST");
    const body = await request.json();
    // console.log(body);
    const user = new UserSchema(body);
    await user.save();
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false, message: err.message }, { status: 500 });
  }
};
