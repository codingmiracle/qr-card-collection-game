import '../styles/globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import {AuthProvider} from "@/components/AuthProvider";
import {createClient} from "@/lib/supabase-server";

const inter = Inter({subsets: ['latin']})


export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode
}) {

  const supabase = createClient();

  const {
    data: {session},
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;

  return (
      <html lang="en">
      <body className={inter.className}>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <main className={'dark'}>
          <h1 className="mb-12 text-5xl font-bold sm:text-6xl">
            Title <span className="font-black text-green-400"> Highlight </span>
          </h1>
          <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
        </main>
      </div>
      </body>
      </html>
  )
}
