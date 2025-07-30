'use client'

import { useState } from 'react'
import axios from 'axios'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleReset = async (e) => {
    e.preventDefault()
    setMessage('') // clear old messages

    try {
      const response = await axios.post(
        'http://localhost:8008/api/login/send-reset-password',
        {
          email,
        }
      )

      setMessage(response.data.message)
    } catch (error) {
      console.error(error)
      setMessage(
        error.response?.data?.message ||
          'Something went wrong. Please try again later.'
      )
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block mb-1">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-[#115737] text-white py-2 rounded hover:bg-green-700">
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  )
}

export default ResetPassword
