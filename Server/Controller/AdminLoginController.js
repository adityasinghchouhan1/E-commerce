const Admin = require('../Modal/LoginModal')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../config/sendEmail')

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey'

const adminLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email })
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // token valid for 1 day
    )

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { id: admin._id, email: admin.email },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const adminLoginsave = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newAdmin = new Admin({ email, password: hashedPassword })
    await newAdmin.save()

    res.status(201).json({ message: 'Admin saved successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const sendResetPasswordLink = async (req, res) => {
  const { email } = req.body

  try {
    const user = await Admin.findOne({ email })
    if (!user) {
      // Do NOT reveal user existence
      return res
        .status(200)
        .json({ message: 'If email exists, reset link sent.' })
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' })

    const resetLink = `http://localhost:3000/reset-password/${token}`

    const html = `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
      <a href="${resetLink}" style="color: blue;">Reset Password</a>
    `

    await sendEmail(email, 'Password Reset Request', html)

    return res.status(200).json({ message: 'Reset link sent.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { adminLogin, adminLoginsave, sendResetPasswordLink }
