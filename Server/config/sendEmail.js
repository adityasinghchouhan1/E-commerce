const nodemailer = require('nodemailer')

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'hotmail', etc.
      auth: {
        user: process.env.EMAIL_USER, // e.g. your Gmail address
        pass: process.env.EMAIL_PASS, // app password or real password (if less secure app allowed)
      },
    })

    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    }

    await transporter.sendMail(mailOptions)
    console.log('Email sent to', to)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

module.exports = sendEmail
