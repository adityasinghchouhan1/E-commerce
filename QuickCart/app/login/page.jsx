'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const AddAdmin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:8008/api/login', {
        email,
        password,
      })

      const { token, message } = response.data
      localStorage.setItem('adminToken', token)
      setMessage(message)
      router.push('/seller')
    } catch (error) {
      console.error('Login error:', error)
      setMessage(error.response?.data?.message || 'Login failed')
    }
  }

  const handleForgotPassword = () => {
    router.push('/reset-password')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md space-y-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#115737] text-white py-2 rounded hover:bg-green-800"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-blue-600 hover:underline text-sm w-full text-center"
        >
          Forgot Password?
        </button>

        {message && <p className="text-center mt-4 text-red-600">{message}</p>}
      </form>
    </div>
  )
}

export default AddAdmin
