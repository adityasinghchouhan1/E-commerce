'use client'

import { useState } from 'react'

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleReset = (e) => {
    e.preventDefault()
    console.log('Sending reset link to:', email)
    setMessage(`If ${email} exists, a reset link has been sent.`)
    // TODO: Replace with real API call
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
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  )
}

export default ResetPassword
