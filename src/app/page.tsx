import React from "react";
import {createClient} from "@/service/supabase/supabase-server";
import Image from "next/image";
import Link from "next/link";
import CardDisplay from "@/components/Collectible/CardDisplay";
import ShardDisplay from "@/components/Collectible/ShardDisplay";

export default async function Home() {
    const supabase = createClient();

    const {
        data: {user},
        error
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
    let incomplete_card_collection = await supabase.rpc('select_incomplete_cards', {'uid': user.id})
    let cards = []
    let shards = []

    if (card_collection.data && !card_collection.error) {
        for (const item of card_collection.data) {
            let card = await supabase.from('card').select('*').eq('id', item.card_id)
            cards.push(card)
        }
    }
    if (incomplete_card_collection.data && !incomplete_card_collection.error) {
        for (const cardId of incomplete_card_collection.data) {
            let [shardList] = await Promise.all([supabase.from('shards').select('card_id,piece_id,count').eq('card_id', cardId)])
            let card = await supabase.from('card').select('*').eq('id', cardId)
            shards.push({cardData: card, shardList: shardList})
        }
    }

    return (
        <main>
            <section className="column mt-4 flex-center">
                <div className={"card-outline-container p-0"}>
                    <h2 className={"w-full pl-4 pb-2 border-primary-600 border-b"}>Your Cards:</h2>
                    <div className="grid-container">
                        {cards.map((item, index) => (
                            <CardDisplay key={index} data={item.data} error={item.error}></CardDisplay>
                        ))}
                    </div>
                    <h2 className={"w-full pl-4 pb-2 border-primary-600 border-b border-t"}>Your Shards:</h2>
                    <div className="grid-container">
                        {shards.map((item, index) => (
                            <ShardDisplay key={index} cardData={item.cardData} shardList={item.shardList}/>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
