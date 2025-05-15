import express, { type Request, type Response } from "express"
import path from "path"
import { sendNotificationEmail, sendConfirmationEmail } from "../src/controllers/emailControllers"
import type { ContactFormData } from "../src/types/email"

const router = express.Router()

// Contact form submission
router.post("/contact", async (req , res) => 
{
  console.log("Receiving Body:",req.body);
  try {
    const formData: ContactFormData = req.body //

    // Send notification email to portfolio owner
    await sendNotificationEmail(formData)
    await sendConfirmationEmail(formData)
    res.status(200).json({
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an error sending your message. Please try again later.",
    })
  }
});

// CV download
router.get("/download-cv", (req, res) => {
  const filePath = path.join(__dirname, "public/assets/Aloj_Oli_CV.pdf")
  res.download(filePath, "Aloj_Oli_CV.pdf", (err) => {
    if (err) {
      console.error("Error downloading file:", err)
      res.status(500).json({ success: false, message: "Failed to download CV" })
    }
  })
})

export default router
