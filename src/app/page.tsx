import React from "react";
import {createClient} from "@/service/supabase/supabase-server";
import Image from "next/image";
import Link from "next/link";
import CardDisplay from "@/components/Collectible/CardDisplay";
import ShardDisplay from "@/components/Collectible/ShardDisplay";
import placeholder from '../../public/qm_placeholder.png'
import icon_common from '../../public/rarity_common.svg'
import icon_rare from '../../public/rarity_rare.svg'
import icon_legendary from '../../public/rarity_legendary.svg'

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
                            <li>
                                <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule={"evenodd"}
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                <p>Redeem Shards by scanning the QR-Codes</p>
                            </li>
                            <li>
                                <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule={"evenodd"}
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                <p>Shards Required:</p>
                                <div className={" ml-2 row gap-2"}>
                                    <Image src={icon_common} alt={""} width={20} height={20}></Image>
                                    <span>2</span>
                                    <Image src={icon_rare} alt={""} width={20} height={20}></Image>
                                    <span>4</span>
                                    <Image src={icon_legendary} alt={""} width={20} height={20}></Image>
                                    <span>8</span>
                                </div>
                            </li>
                            <li>
                                <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule={"evenodd"}
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                <p>
                                    by Collecting all Shards you will get a card
                                </p>
                            </li>
                            <li>
                                <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule={"evenodd"}
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                                </svg>
                                <p>
                                    You can view your Collection on your Dashboard
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        )
    }

    const card_collection_data = supabase
        .from('collectibles')
        .select('card_id,count')
        .eq('user_id', user.id)
    const incomplete_card_collection_data = supabase.rpc('select_incomplete_cards', {'uid': user.id})
    const [card_collection, incomplete_card_collection] = await Promise.all([card_collection_data, incomplete_card_collection_data])
    let cards: any[] = []
    let shards: any[] = []

    if (card_collection.data && !card_collection.error) {
        for (const item of card_collection.data) {
            cards.push(supabase.from('card').select('*').eq('id', item.card_id))
        }
        cards = await Promise.all(cards)
    }
    if (incomplete_card_collection.data && !incomplete_card_collection.error) {
        let shardList = [];
        let card = [];
        for (const cardId of incomplete_card_collection.data) {
            shardList.push(supabase.from('shards').select('card_id,piece_id,count').eq('card_id', cardId))
            card.push(supabase.from('card').select('*').eq('id', cardId))
        }
        shardList = await Promise.all(shardList)
        card = await Promise.all(card)
        for (let i = 0; i < card.length; i++) {
            shards.push({cardData: card.at(i), shardList: shardList.at(i)})
        }
    }

    return (
        <main>
            <section className="column mt-4 flex-center">
                <div className={"card-container gap-0.5 m-4"}>
                    <h2>Scan doesn&apos;t work:</h2>
                    <Link href={"/draw"} className={"button-inverse w-full"}>Enter Code</Link>
                    <h2>Bonus:</h2>
                    <Link href={"/oldies"} className={"button-inverse w-full"}>Pictures</Link>
                    <Link href={"/quotes"} className={"button-inverse w-full"}>Quotes</Link>
                </div>
                <div className={"card-outline-container p-0"}>
                    <h2 className={"w-full pl-4 pb-2 border-primary-600 border-b"}>Your Cards:</h2>
                    <div className="grid-container">
                        {cards.length ? cards.map((item, index) => (
                            <CardDisplay key={index} data={item.data} error={item.error}></CardDisplay>
                        )) : (<Image src={placeholder} alt={"?"} width={320} height={400}></Image>)}
                    </div>
                    <h2 className={"w-full pl-4 pb-2 border-primary-600 border-b border-t"}>Your Shards:</h2>
                    <div className="grid-container">
                        {shards.length ? shards.map((item, index) => (
                            <ShardDisplay key={index} cardData={item.cardData} shardList={item.shardList}/>
                        )) : (<Image src={placeholder} alt={"?"} width={320} height={400}></Image>)}
                    </div>
                </div>
            </section>
        </main>
    )
}
