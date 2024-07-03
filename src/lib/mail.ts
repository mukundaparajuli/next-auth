import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
console.log(resend);
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  resend.emails
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
