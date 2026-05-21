import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    const existingUserVerfiedByUsername = UserModel.findOne({
      username,
      isVerified: true,
    });
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
