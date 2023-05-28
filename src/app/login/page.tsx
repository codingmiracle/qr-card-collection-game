'use client';

import {useAuth, VIEWS} from "@/components/Auth/AuthProvider";
import React from "react";
import Auth from "@/components/Auth";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";

export default function Home() {
    const {initial, user, view, signOut} = useAuth();

    if (initial) {
        return (
            <section className="flex-center">
                <div className={"card"}>
                    <Loader/>
                </div>
            </section>
        );
    }

    if (view === VIEWS.UPDATE_PASSWORD) {
        return <Auth view={view}/>;
    }

    if (user) {
        return (
            <section className={"flex-center"}>
                <div className="card w-fit">
                    <h2>Welcome!</h2>
                    <code className="highlight m-0">{user.role}</code>
                    <Link className="link w-full" href={"/profile"}>
                        Go to Profile
                    </Link>
                    <button type="button" className="button w-full" onClick={signOut}>
                        Sign Out
                    </button>
                </div>
            </section>
        );
    }

    return <Auth view={view}/>;
}