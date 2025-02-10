"use server"

import Link from "next/link"
import { LogIn } from "lucide-react"

export default async function HomePage() {
  return (
    <div className="flex-1 p-4 pt-0">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>

      <nav className="flex space-x-4 mb-4">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/auth" className="flex items-center hover:underline">
          <LogIn className="mr-1" />
          Auth
        </Link>
      </nav>
    </div>
  )
}
