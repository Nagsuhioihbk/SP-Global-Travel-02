import nodemailer from "nodemailer";

export async function POST(req) {
  const body = await req.json();
  const { name, phone, email, date, pickup, drop, notes } = body;

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
      replyTo: email || process.env.GMAIL_USER,
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Travel Date:</strong> ${date}</p>
        <p><strong>Pickup Location:</strong> ${pickup}</p>
        <p><strong>Drop Location:</strong> ${drop}</p>
        <p><strong>Message:</strong> ${notes || "None"}</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Booking request sent successfully!",
      bookingId: `BK-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
    });
  } catch (err) {
    console.error("Booking Error:", err);
    return Response.json({ success: false, message: "Error sending booking request" }, { status: 500 });
  }
}