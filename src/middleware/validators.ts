import type { Request, Response, NextFunction } from "express"
import type { ContactFormData } from "../types/email"

// Validate contact form input
export const validateContactForm = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, subject, message } = req.body as ContactFormData;

  // Check if all required fields are present
  if (!name || !email || !subject || !message) {
    res.status(400).json({ success: false, message: "All fields are required" });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
  res.status(400).json({ success: false, message: "Please enter a valid email address" });
  return;
  }

  // Validate message length
  if (message.length < 10) {
     res.status(400).json({ success: false, message: "Message must be at least 10 characters long" });
      return;
  }

  // If all validations pass, proceed to the next middleware
  next()
};
