import nodemailer from 'nodemailer';
import type { EmailData } from "../types/email";

// Create transporter with more robust configuration
const transporter = nodemailer.createTransport({
   service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
(async() => {await transporter.verify();
  console.log("email");
})()

// Improved email sending with error handling
export const sendNotificationEmail = async (data: EmailData): Promise<nodemailer.SentMessageInfo> => {
  try {
    const { name, email, subject, message } = data;
    
    if (!process.env.EMAIL_USER || !process.env.RECIPIENT_EMAIL) {
      throw new Error('Email configuration is missing');
    }
    return await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact: ${subject}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    });
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
};

export const sendConfirmationEmail = async (data: EmailData): Promise<nodemailer.SentMessageInfo> => {
  try {
    const { name, email, subject, message } = data;

    if (!process.env.EMAIL_USER) {
      throw new Error('Email configuration is missing');
    }

    return await transporter.sendMail({
      from: `"Aloj Oli" <${process.env.EMAIL_USER}>`, // Fixed formatting
      to: email,
      subject: `Thank you for contacting me! - ${subject}`,
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hello ${name},</p>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <p>Best regards,<br>Aloj Oli</p>
      `,
    });
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};