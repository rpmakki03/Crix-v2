"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { CricketCard, cricketCards } from './data'
import { supabase } from './utils'

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

  // Restore userCards from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedCards = localStorage.getItem(`crix_userCards_${user.type}_${user.address || user.email || ''}`)
      if (savedCards) {
        setUserCards(JSON.parse(savedCards))
      } else {
        setUserCards([])
      }
    } else {
      setUserCards([])
    }
  }, [user])

  // Save userCards to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`crix_userCards_${user.type}_${user.address || user.email || ''}`, JSON.stringify(userCards))
    }
  }, [user, userCards])

  // Listen for Supabase Auth state changes
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        setUser({ type: 'email', email: session.user.email })
        localStorage.setItem('crix_user', JSON.stringify({ type: 'email', email: session.user.email }))
      } else {
        setUser(null)
        localStorage.removeItem('crix_user')
      }
    })
    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // Fetch user cards from Supabase when user logs in (email type only)
  useEffect(() => {
    const fetchUserCards = async () => {
      if (user && user.type === 'email' && user.email) {
        const { data: { user: supaUser } } = await supabase.auth.getUser();
        if (supaUser) {
          const { data, error } = await supabase
            .from('user_cards')
            .select('card_id')
            .eq('user_id', supaUser.id);
          if (!error && data) {
            // Map card_ids to full CricketCard objects
            const cards = data
              .map((row: any) => cricketCards.find(card => card.id === row.card_id))
              .filter(Boolean);
            setUserCards(cards as CricketCard[]);
          }
        }
      }
    };
    fetchUserCards();
  }, [user]);

  const connectUser = (type: 'metamask' | 'phantom' | 'email', address?: string) => {
    const newUser: User = {
      type,
      ...(address && { address }),
      ...(type === 'email' && address && { email: address })
    }
    setUser(newUser)
    localStorage.setItem('crix_user', JSON.stringify(newUser))
    // Restore cards for this user
    const savedCards = localStorage.getItem(`crix_userCards_${type}_${address || ''}`)
    if (savedCards) {
      setUserCards(JSON.parse(savedCards))
    } else {
      setUserCards([])
    }
  }

  const disconnectUser = () => {
    setUser(null)
    setUserCards([])
    localStorage.removeItem('crix_user')
    // Optionally, do not remove userCards from localStorage so they persist for next login
  }

  const addCardToCollection = async (card: CricketCard) => {
    setUserCards(prev => [...prev, card]);
    if (user && user.type === 'email' && user.email) {
      const { data: { user: supaUser } } = await supabase.auth.getUser();
      if (supaUser) {
        await supabase.from('user_cards').insert({ user_id: supaUser.id, card_id: card.id });
      }
    }
  };

  const removeCardFromCollection = async (cardId: string) => {
    setUserCards(prev => prev.filter(card => card.id !== cardId));
    if (user && user.type === 'email' && user.email) {
      const { data: { user: supaUser } } = await supabase.auth.getUser();
      if (supaUser) {
        await supabase.from('user_cards').delete().eq('user_id', supaUser.id).eq('card_id', cardId);
      }
    }
  };

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