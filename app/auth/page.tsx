"use client"

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Input from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AuthPage() {
  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  // Registration state
  const [regEmail, setRegEmail] = useState("")
  const [regPassword, setRegPassword] = useState("")
  const [regConfirmPassword, setRegConfirmPassword] = useState("")
  const [regError, setRegError] = useState("")

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields.")
      return
    }
    setLoginError("")
    // TODO: Integrate Clerk SignIn if available
    console.log("Login submitted", { loginEmail, loginPassword })
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!regEmail || !regPassword || !regConfirmPassword) {
      setRegError("Please fill in all fields.")
      return
    }
    if (regPassword !== regConfirmPassword) {
      setRegError("Passwords do not match.")
      return
    }
    setRegError("")
    // TODO: Integrate Clerk SignUp if available
    console.log("Registration submitted", { regEmail, regPassword })
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="login">
        <TabsList className="mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium mb-1">Email</label>
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium mb-1">Password</label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            {loginError && <div className="text-red-500 text-sm">{loginError}</div>}
            <Button type="submit">Login</Button>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium mb-1">Email</label>
              <Input
                id="reg-email"
                type="email"
                placeholder="Enter your email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reg-password" className="block text-sm font-medium mb-1">Password</label>
              <Input
                id="reg-password"
                type="password"
                placeholder="Enter your password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="reg-confirm-password" className="block text-sm font-medium mb-1">Confirm Password</label>
              <Input
                id="reg-confirm-password"
                type="password"
                placeholder="Confirm your password"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
              />
            </div>
            {regError && <div className="text-red-500 text-sm">{regError}</div>}
            <Button type="submit">Register</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
