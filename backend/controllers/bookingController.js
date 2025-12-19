const { Booking } = require("../models");
const nodemailer = require("nodemailer");

let transporter;

const initMailer = async () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log(`✅ Real Email System Ready! (${process.env.EMAIL_USER})`);
  } else {
    console.log("⚠️ No Real Email Credentials. Email sending is disabled or in demo mode.");
  }
};

initMailer();

exports.createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER || '"Serenity" <no-reply@serenity.com>',
        to: booking.email,
        subject: `Booking Confirmed! ID: ${booking.id}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: #C5A25A;">Booking Received!</h2>
            <p>Dear <strong>${booking.guestName}</strong>,</p>
            <p>Thank you for choosing Serenity Hotels.</p>
            <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0;">
              <p><strong>Booking ID:</strong> ${booking.id}</p>
              <p><strong>Room:</strong> ${booking.roomName}</p>
              <p><strong>Total Price:</strong> ₹${booking.totalPrice}</p>
            </div>
            <p>Best Regards,<br/>Serenity Team</p>
          </div>
        `,
      };

      if (transporter) {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${booking.email}`);
      }
    } catch (emailError) {
      console.error("⚠️ Booking created, but Email failed to send:", emailError.message);
    }

    res.status(201).json(booking);

  } catch (error) {
    console.error("❌ Booking Error:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [['createdAt', 'DESC']] });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  const { email } = req.query;
  try {
    const bookings = await Booking.findAll({ 
      where: { email },
      order: [['createdAt', 'DESC']] 
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      booking.status = req.body.status;
      await booking.save();
      res.json(booking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (booking) {
      await booking.destroy();
      res.json({ message: "Booking removed" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};