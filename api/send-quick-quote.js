import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { pickup, drop, date, passengers } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "New Quick Quote Request",
      html: `
        <h2>Quick Quote Request</h2>
        <p><strong>Pickup City:</strong> ${pickup}</p>
        <p><strong>Drop City:</strong> ${drop}</p>
        <p><strong>Travel Date:</strong> ${date}</p>
        <p><strong>Number of Passengers:</strong> ${passengers}</p>
        <hr>
        <p><em>Note: This is a quick quote request. Please contact the customer with pricing details.</em></p>
      `,
    });

    res.status(200).json({ success: true, message: "Quote request received! We'll contact you soon." });
  } catch (err) {
    console.error("Quick Quote Error:", err);
    res.status(500).json({ success: false, message: "Error sending quick quote request" });
  }
}
