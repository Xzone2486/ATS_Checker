"use client"

import React, { createContext, useContext, useState } from "react"

type User = { name: string; email: string; avatar: string } | null

interface AuthContextType {
  user: User
  signIn: (name: string, email: string) => void
  signOut: () => void
  showModal: boolean
  openModal: () => void
  closeModal: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
  showModal: false,
  openModal: () => {},
  closeModal: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [showModal, setShowModal] = useState(false)

  const signIn = (name: string, email: string) => {
    setUser({ name, email, avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(email)}` })
    setShowModal(false)
  }

  const signOut = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, showModal, openModal: () => setShowModal(true), closeModal: () => setShowModal(false) }}>
      {children}
    </AuthContext.Provider>
  )
}
