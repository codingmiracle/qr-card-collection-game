'use client';

import {useAuth, VIEWS} from "@/components/AuthProvider";
import React from "react";
import Auth from "@/components/Auth";
import Link from "next/link";

export default function Home() {
    const {initial, user, view, signOut} = useAuth();

    if (initial) {
        return <div className="card h-72">Loading...</div>;
    }

    if (view === VIEWS.UPDATE_PASSWORD) {
        return <Auth view={view}/>;
    }

    if (user) {
        return (
            <div className="card">
                <h2>Welcome!</h2>
                <code className="highlight">{user.role}</code>
                <Link className="button" href="/profile">
                    Go to Profile
                </Link>
                <button type="button" className="button-inverse" onClick={signOut}>
                    Sign Out
                </button>
            </div>
        );
    }

    return <Auth view={view}/>;
}