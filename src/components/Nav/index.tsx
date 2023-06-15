'use client';

import Link from "next/link";
import React from "react";
import {useAuth} from "@/components/Auth/AuthProvider";
import SignOut from "@/components/Auth/SignOut";
import Image from "next/image";

export default function Nav() {
    const {user} = useAuth();

    return (
        <header
            className={"p-4 flex justify-between bg-black opacity-70 sticky top-0 z-50 backdrop-blur-sm"}>
            <div className={"space-x-6 flex items-center"}>
                <Link className={"text-lg leading-none"} href={"/"}>
                    <Image src="/htlel.svg" width={36} height={36} className="screen-icon" alt={"Home"}></Image>
                </Link>
            </div>
            <div className="justify-self-end grid grid-flow-col gap-4">
                {user ? (
                    <>
                        <SignOut></SignOut>
                        <div className={"flex-center"}>
                            <Link className={"link h-fit"} href={"/profile"}>{user?.email}</Link>
                        </div>
                    </>
                ) : (
                    <Link href={"/login"} className={"button-inverse justify-self-end px-2"}>
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    )
}