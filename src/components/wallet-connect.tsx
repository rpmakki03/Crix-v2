"use client"

import { useState } from 'react'
import { Wallet, Mail, User } from 'lucide-react'

interface WalletConnectProps {
  onConnect: (type: 'metamask' | 'phantom' | 'email', address?: string) => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [email, setEmail] = useState('')
  const [showEmailInput, setShowEmailInput] = useState(false)

  const connectMetaMask = async () => {
    setIsConnecting(true)
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length > 0) {
          onConnect('metamask', accounts[0])
        }
      } else {
        alert('MetaMask is not installed! Please install MetaMask to continue.')
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error)
      alert('Failed to connect to MetaMask')
    }
    setIsConnecting(false)
  }

  const connectPhantom = async () => {
    setIsConnecting(true)
    try {
      if (typeof window.solana !== 'undefined') {
        const resp = await window.solana.connect()
        onConnect('phantom', resp.publicKey.toString())
      } else {
        alert('Phantom wallet is not installed! Please install Phantom to continue.')
      }
    } catch (error) {
      console.error('Error connecting to Phantom:', error)
      alert('Failed to connect to Phantom')
    }
    setIsConnecting(false)
  }

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      onConnect('email', email)
      setEmail('')
      setShowEmailInput(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={connectMetaMask}
          disabled={isConnecting}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          <Wallet className="h-5 w-5" />
          {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>

        <button
          onClick={connectPhantom}
          disabled={isConnecting}
          className="flex items-center justify-center gap-3 px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50"
        >
          <Wallet className="h-5 w-5" />
          {isConnecting ? 'Connecting...' : 'Connect Phantom'}
        </button>
      </div>

      <div className="text-center">
        <span className="text-muted-foreground">or</span>
      </div>

      {!showEmailInput ? (
        <button
          onClick={() => setShowEmailInput(true)}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <Mail className="h-5 w-5" />
          Sign in with Email
        </button>
      ) : (
        <form onSubmit={handleEmailSignIn} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <User className="h-4 w-4" />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setShowEmailInput(false)}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
} 