import '../styles/globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import {AuthProvider} from "@/components/AuthProvider";
import {createClient} from "@/lib/supabase-server";
import Header from "@/app/header";

const inter = Inter({subsets: ['latin'], preload: true, weight: "300"})

export default async function RootLayout({children,}: {
    children: React.ReactNode
}) {
    const supabase = createClient();

    const {
        data: {session},
    } = await supabase.auth.getSession();

    const accessToken = session?.access_token || null;

    return (
        <html lang="en">
        <head>
            <title>qr-card-collection-game</title>
            <link rel="icon" href="favicon.ico"/>
            <meta name="viewport" content="width=device-width"/>
        </head>
        <body className={inter.className}>
        <Header/>
        <h1 className="mb-12 text-5xl sm:text-6xl">
            Title <span className="font-black text-green-400"> Highlight </span>
        </h1>
        <AuthProvider accessToken={accessToken}>
            {children}
        </AuthProvider>
        </body>
        </html>
  )
}
