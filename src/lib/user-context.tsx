"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { CricketCard } from './data'

interface User {
  type: 'metamask' | 'phantom' | 'email'
  address?: string
  email?: string
}

interface UserContextType {
  user: User | null
  userCards: CricketCard[]
  connectUser: (type: 'metamask' | 'phantom' | 'email', address?: string) => void
  disconnectUser: () => void
  addCardToCollection: (card: CricketCard) => void
  removeCardFromCollection: (cardId: string) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userCards, setUserCards] = useState<CricketCard[]>([])

  // Restore user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('crix_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const connectUser = (type: 'metamask' | 'phantom' | 'email', address?: string) => {
    const newUser: User = {
      type,
      ...(address && { address }),
      ...(type === 'email' && address && { email: address })
    }
    setUser(newUser)
    localStorage.setItem('crix_user', JSON.stringify(newUser))
  }

  const disconnectUser = () => {
    setUser(null)
    setUserCards([])
    localStorage.removeItem('crix_user')
  }

  const addCardToCollection = (card: CricketCard) => {
    setUserCards(prev => [...prev, card])
  }

  const removeCardFromCollection = (cardId: string) => {
    setUserCards(prev => prev.filter(card => card.id !== cardId))
  }

  return (
    <UserContext.Provider value={{
      user,
      userCards,
      connectUser,
      disconnectUser,
      addCardToCollection,
      removeCardFromCollection
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 