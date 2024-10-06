import dotenv from "dotenv"; // Import dotenv
import nodemailer from "nodemailer"; // Use ES module import
import ejs from "ejs"; // Use ES module import
import { fileURLToPath } from 'url'; // To handle __dirname in ES modules
import path from "path"; // Use ES module import

dotenv.config(); // Load environment variables

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory of the current file

// Define the sendMail function as a named export
export const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        },
        secure: true, // Use TLS
    });

    const { email, subject, template, data } = options;

    // Log template for debugging

    // Get the path to the email template file
    const templatePath = path.join(__dirname, "../mails", template);
    
    // Log templatePath for debugging

    // Render the EJS template with the provided data
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject,
        html
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

export default sendMail; // Default export
