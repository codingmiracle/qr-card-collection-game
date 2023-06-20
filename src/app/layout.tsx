import '../styles/globals.css'
import {Montserrat} from 'next/font/google'
import React from "react";
import {AuthProvider} from "@/components/Auth/AuthProvider";
import {createClient} from "@/service/supabase/supabase-server";
import Nav from "@/components/Nav";

const montserrat = Montserrat({subsets: ['latin'], preload: true, weight: "500"})

export default async function RootLayout({children}: {
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
        <body className={montserrat.className}>
        <AuthProvider accessToken={accessToken}>
            <Nav></Nav>
            {children}
        </AuthProvider>
        </body>
        </html>
    )
}
