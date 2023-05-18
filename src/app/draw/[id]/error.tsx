'use client';

import React from "react";
import Link from "next/link";

export default function Error({error, reset}: { error: Error, reset: () => void }) {
    return (
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 dark:bg-zinc-800">
            <div className="text-center">
                <p className={"text-base text-emerald-700 dark:text-emerald-500"}>
                    There was a problem
                </p>
                <h1 className="mt-4 text-3xl tracking-tight text-zinc-900 dark:text-zinc-50">
                    {error.message || 'Something went wrong'}
                </h1>
                <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-50">
                    Please try again later!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button onClick={reset}>Try again</button>
                    <Link href="/" className={""}>
                        Go back Home
                    </Link>
                </div>
            </div>
        </main>
    );
}