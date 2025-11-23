// import nodemailer from "nodemailer";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

//   const { fullname, email, phone, subject, description } = req.body;
//   if (!fullname || !email || !phone || !subject || !description) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   try {
//     await transporter.sendMail({
//       from: email,
//       to: "nn1528523@gmail.com",
//       subject: `New Contact Form: ${subject}`,
//       text: `
//         Name: ${fullname}
//         Email: ${email}
//         Phone: ${phone}
//         Subject: ${subject}

//         Message:
//         ${description}
//       `,
//     });

//     res.status(200).json({ message: "Message sent successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to send message", error: err.message });
//   }
// }


import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gmail Credentials (Directly Added as Requested)
const GMAIL_USER = "spglobaltravels@gmail.com";
const GMAIL_PASS = "psme nfdj fdbb kynx";  // Your Gmail App Password

// Common transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// ===============================
// BOOKING FORM
// ===============================
// ===============================
// CONTACT/BOOKING PAGE FORM
// ===============================
app.post("/send-booking-request", async (req, res) => {
  const { 
    name, 
    phone, 
    email, 
    date, 
    time, 
    pickup, 
    drop, 
    vehicle, 
    passengers, 
    notes 
  } = req.body;

  try {
    const mailOptions = {
      from: GMAIL_USER,
      to: GMAIL_USER,
      replyTo: email || GMAIL_USER,
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Travel Date:</strong> ${date}</p>
        <p><strong>Preferred Time:</strong> ${time || 'Not specified'}</p>
        <p><strong>Pickup Location:</strong> ${pickup}</p>
        <p><strong>Drop Location:</strong> ${drop}</p>
        <p><strong>Vehicle Type:</strong> ${vehicle}</p>
        <p><strong>Number of Passengers:</strong> ${passengers}</p>
        <p><strong>Additional Notes:</strong></p>
        <p>${notes || 'None'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: "Booking request sent successfully!",
      bookingId: `BK-${Math.random().toString(36).slice(2, 9).toUpperCase()}`
    });
  } catch (error) {
    console.error("Booking Request Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error sending booking request" 
    });
  }
});

// ===============================
// CAREER FORM
// ===============================
app.post("/send-career", async (req, res) => {
  const { name, email, phone, position, experience, message } = req.body;

  try {
    const mailOptions = {
      from: email,
      to: GMAIL_USER,
      subject: `Career Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Position: ${position}
Experience: ${experience}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Career email sent!" });
  } catch (error) {
    console.error("Career Error:", error);
    res.status(500).json({ success: false, message: "Error sending mail" });
  }
});

// ===============================
// CONTACT FORM
// ===============================
app.post("/send-contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const mailOptions = {
      from: email,
      to: GMAIL_USER,
      subject: `New Contact Form Message`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Contact email sent!" });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ success: false, message: "Error sending mail" });
  }
});

// ===============================
// FEEDBACK FORM
// ===============================
app.post("/send-feedback", async (req, res) => {
  const { name, email, feedback } = req.body;

  try {
    const mailOptions = {
      from: email,
      to: GMAIL_USER,
      subject: `New Feedback From ${name}`,
      text: `
Name: ${name}
Email: ${email}
Feedback: ${feedback}
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Feedback sent successfully!" });
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({ success: false, message: "Error sending mail" });
  }
});

// ===============================
// QUICK QUOTE FORM (Homepage)
// ===============================
app.post("/send-quick-quote", async (req, res) => {
  const { pickup, drop, date, passengers } = req.body;

  try {
    const mailOptions = {
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: `New Quick Quote Request`,
      html: `
        <h2>Quick Quote Request</h2>
        <p><strong>Pickup City:</strong> ${pickup}</p>
        <p><strong>Drop City:</strong> ${drop}</p>
        <p><strong>Travel Date:</strong> ${date}</p>
        <p><strong>Number of Passengers:</strong> ${passengers}</p>
        <hr>
        <p><em>Note: This is a quick quote request. Please contact the customer with pricing details.</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ 
      success: true, 
      message: "Quote request received! We'll contact you soon with pricing."
    });
  } catch (error) {
    console.error("Quick Quote Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error sending quote request" 
    });
  }
});

// ===============================
// START SERVER
// ===============================
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
