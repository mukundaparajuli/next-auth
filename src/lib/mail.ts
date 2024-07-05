import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails
    .send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href=${confirmLink}>here</a> to confirm your email.</p>`,
    })
    .then(() => {
      console.log("Email has been sent successfully to " + email);
      console.log("Confirm Link:", confirmLink);
    })
    .catch((error) => {
      console.log("Error occured while sending email: ", error);
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your password",
      html: `<p>Click <a href=${resetLink}>here</a> to reset your password.</p>`,
    });
  } catch (error) {
    console.log("Error occured while sending email: ", error);
  }
};
