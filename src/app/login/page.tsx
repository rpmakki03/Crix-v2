"use client"

import { useState } from 'react'
import { supabase } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgot, setShowForgot] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMsg, setResetMsg] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
  }

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetMsg('')
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail)
    if (error) {
      setResetMsg(error.message)
    } else {
      setResetMsg('Password reset email sent!')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-card rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="flex justify-end">
          <button type="button" className="text-xs text-primary underline" onClick={() => setShowForgot(v => !v)}>
            Forgot password?
          </button>
        </div>
        {showForgot && (
          <form onSubmit={handleForgot} className="space-y-2 mb-2">
            <input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} placeholder="Enter your email" className="w-full border rounded px-3 py-2" required />
            <button type="submit" className="w-full bg-secondary text-black dark:text-white py-2 rounded font-semibold hover:bg-secondary/90 transition">Send reset email</button>
            {resetMsg && <div className="text-xs text-green-600 dark:text-green-400">{resetMsg}</div>}
          </form>
        )}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" disabled={loading} className="w-full bg-black text-white dark:bg-white dark:text-black py-2 rounded font-semibold hover:opacity-90 transition">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
} 