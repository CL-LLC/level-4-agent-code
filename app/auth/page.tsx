"use client"

import React from "react"
import { SignIn, SignUp } from "@clerk/nextjs"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome - Login or Register</h1>
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="flex justify-around mb-4">
          <TabsTrigger value="login" className="px-4 py-2">Login</TabsTrigger>
          <TabsTrigger value="register" className="px-4 py-2">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="w-full">
          <SignIn />
        </TabsContent>
        <TabsContent value="register" className="w-full">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  )
}
