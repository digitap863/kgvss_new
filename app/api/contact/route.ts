import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 1. Validate payload fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "All fields (name, email, subject, message) are required." },
        { status: 400 }
      );
    }

    // 2. Fetch email credentials from environment variables
    const emailHost = process.env.EMAIL_HOST || "smtp.gmail.com";
    const emailPort = parseInt(process.env.EMAIL_PORT || "587", 10);
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO;

    if (!emailUser || !emailPass || !emailTo) {
      return NextResponse.json(
        { success: false, message: "Email configuration is not set up on the server." },
        { status: 500 }
      );
    }

    // 3. Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailPort === 465, // True only for 465 SSL, false for other ports (like 587 TLS)
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // 4. Configure email headers & body
    const mailOptions = {
      from: `"${name}" <${emailUser}>`, // Use authenticated user email to send
      replyTo: email,                  // Replies direct back to the sender
      to: emailTo,
      subject: `[KGVSS website enquiry] - ${subject}: ${name}`,
      text: `Website Enquiry Details:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; line-height: 1.6; color: #15171a;">
          <h2 style="color: #15171a; margin-top: 0; padding-bottom: 12px; border-bottom: 1px solid #f0f0f0;">New Website Enquiry</h2>
          <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #4a4f58; text-decoration: underline;">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 16px; background-color: #f7f8fb; border-left: 4px solid #15171a; border-radius: 4px;">
            <p style="margin: 0; font-weight: bold; padding-bottom: 8px;">Message:</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 11px; color: #888; margin-top: 30px; border-top: 1px solid #f0f0f0; padding-top: 10px;">This email was sent automatically from the KGVSS website enquiry form.</p>
        </div>
      `,
    };

    // 5. Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted and email sent successfully.",
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
