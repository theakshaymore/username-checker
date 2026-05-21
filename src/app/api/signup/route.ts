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
      const newUser = new UserModel({
        username,
        email,
        password: hasedPassword,
        isVerified: false,
      });

      await newUser.save();

      const verificationCode = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
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
