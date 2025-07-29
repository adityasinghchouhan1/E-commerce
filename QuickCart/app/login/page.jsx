'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Logging in with:', { username, password })
    // TODO: Replace with real API call
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-[#115737] text-white py-2 rounded hover:bg-green-800">
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/reset-password')}
            className="text-[#115737] hover:underline text-sm"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
