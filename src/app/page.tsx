import React from "react";
import {createClient} from "@/lib/supabase-server";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/Card";

export default async function Home() {
    const supabase = createClient();

    const {
        data: {user}
    } = await supabase.auth.getUser()

    if (!user) {
        return (
            <main className="column">
                <section className='flex-center w-full min-h-screen'>
                    <div className="screen-image"></div>
                    <div className="screen-overlay"></div>
                    <div className="card-outline-container flex-center z-10">
                        <Image src="/htlel.svg" width={200} height={200} className="screen-icon" alt={"-x-"}></Image>
                        <div className="name">HTLEL</div>
                        <Link href={"/login"} className={"button-inverse px-16"}>get started</Link>
                    </div>
                </section>
                <section className={"flex-center w-full"}>
                    <div className={"card-outline-container"}>
                        <h1>How does it work?</h1>
                        <h3>Tutorial here</h3>
                    </div>
                </section>
            </main>
        )
    }

    return (
        <main>
            <section className="column mt-4">
                <h2>Your Cards:</h2>
                <div className="grid-container">
                    <Card id={'7598102c-0883-4563-bc97-631451fe7487'}/>
                    <Card id={'b6c6ddc6-3429-4a47-be89-3e7b784e083c'}/>
                    <Card id={'b6c6ddc6-3429-4a47-be89-3e7b784e083c'}/>
                </div>
            </section>
        </main>
    )


}
