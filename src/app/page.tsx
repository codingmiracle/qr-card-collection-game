import React from "react";
import {createClient} from "@/lib/supabase-server";
import Image from "next/image";
import Link from "next/link";
import CardDisplay from "@/components/Collectible/CardDisplay";

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
                        <div className="name mx-8">HTLEL</div>
                        <div className={"row w-full"}>
                            <Link href={"/draw"} className={"button w-1/2"}>get started</Link>
                            <Link href={"#tutorial"} className={"button-inverse w-1/2"}>Info</Link>
                        </div>
                    </div>
                </section>
                <section className={"flex-center w-full"}>
                    <div className={"card-outline-container"}>
                        <h1 id={"tutorial"}>How does it work?</h1>
                        <h3>Tutorial here</h3>
                    </div>
                </section>
            </main>
        )
    }

    let card_collection = await supabase
        .from('collectibles')
        .select('card_id,count')
        .eq('user_id', user.id)
    let shard_collection = await supabase
        .from('shards')
        .select('card_id,piece_id,count')
        .eq('user_id', user.id)

    if (card_collection.data && !card_collection.error && card_collection.data.length > 0) {
        let cards = []
        for (const item of card_collection.data) {
            let card = await supabase.from('card').select('*').eq('id', item.card_id)
            cards.push(card)
        }
        //console.log(cards.map( card => card.data?.pop()))
        return (
            <main>
                <section className="column mt-4">
                    <h2>Your Cards:</h2>
                    <div className="grid-container">
                        {cards.map((item, index) => (
                            <CardDisplay key={index} data={item.data} error={item.error}></CardDisplay>
                        ))}
                    </div>
                </section>
            </main>
        )
    }
    return (
        <main>
            <section className="column mt-4">
                <h2>Your Cards:</h2>
                <h3>You havent collected any Cards yet!</h3>
            </section>
        </main>
    )
}
