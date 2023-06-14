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
            <section className="flex-center mt-4">
                <div className={"card-container"}>
                    <Loader/>
                </div>
            </section>
        );
    }

    if (view === VIEWS.UPDATE_PASSWORD) {
        return (
            <section className={"flex-center mt-4"}>
                <Auth view={view}/>
            </section>
        );
    }

    if (user) {
        return (
            <section className={"flex-center mt-4"}>
                <div className="card-container w-fit">
                    <h2>Welcome!</h2>
                    <div className={"card-outline-container m-0"}>
                        <h3>Get started by scanning QR-Codes!</h3>
                        <Link href={"/draw"} className={"link"}>scan funktioniert nicht</Link>
                    </div>

                    <button type="button" className="button w-full" onClick={signOut}>
                        Sign Out
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className={"flex-center mt-4"}>
            <Auth view={view}/>
        </section>
    );
}