import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verfyCode: string,
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "akshaymore.dev@gmail.com",
      to: email,
      subject: "Verify your email for Mystry",
      react: VerificationEmail({ username, otp: verfyCode }),
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, message: "Failed to send verification email." };
  }
}
