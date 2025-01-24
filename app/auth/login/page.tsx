'use client'

import { Footer } from "@/app/_components/commons"
import { LoginForm } from "@/app/_components/forms/auth"


export default function Login() {

  return (
    <main className="bg-black flex items-center justify-center min-h-screen overflow-hidden">
      <LoginForm />
    </main>
  )
}