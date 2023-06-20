'use client';

import {useAuth, VIEWS} from "@/components/Auth/AuthProvider";
import React from "react";
import Auth from "@/components/Auth";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";

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
                    <ul>
                        <li>
                            <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule={"evenodd"}
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                            </svg>
                            <p>Search for QR-Codes</p>
                            <Image src="/qr_code_scanner.svg" width={150} height={150} className="screen-icon ml-8"
                                   alt={"-x-"}/>
                        </li>
                        <p>Troubles with QR-Codes?</p>
                        <li>
                            <Link href={"/draw"} className={"button-inverse w-full"}>Enter Code</Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule={"evenodd"}
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                            </svg>
                            <p>Collect the Shards and puzzle the Cards together</p>
                        </li>
                        <li>
                            <Link href={"/"} className={"button-inverse w-full"}>View Collection</Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule={"evenodd"}
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                            </svg>
                            <p>You automatically stay Signed In!</p>
                        </li>
                    </ul>
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