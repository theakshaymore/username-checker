import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserVerfiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerfiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken.",
        },
        { status: 400 },
      );

      const hasedPassword = await bcrypt.hash(password, 10);
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      const newUser = new UserModel({
        username,
        email,
        password: hasedPassword,
        verfiyCode: verificationCode,
        verifyCodeExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        isverify: false,
        isAcceptingMesage: true,
        messages: [],
      });
      //

      await newUser.save();
    }
  } catch (error) {
    console.error("Error in signup route:", error);
    return Response.json(
      {
        success: false,
        message: "An error occurred during signup. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
}
