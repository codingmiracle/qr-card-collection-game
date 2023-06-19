import {createClient} from "@/service/supabase/supabase-server";
import {redirect} from "next/navigation";
import {maxPieces} from "@/components/Collectible/utils";
import ShardDto from "@/service/draw/shard.dto";
import supabase from "@/service/supabase/supabase-browser";
import Image from "next/image";
import common_reveal from '../../../../public/shard-reveal-common.png'
import rare_reveal from '../../../../public/shard-reveal-rare.png'
import legendary_reveal from '../../../../public/shard-reveal-legendary.png'
import qm_placeholder from '../../../../public/qm_placeholder.png'
import {Simulate} from "react-dom/test-utils";
import {DataIsUndefinedError} from "@/service/exceptions";


export async function getRandomShardForUser(user: any, rarity: number) {
    let randomCard: any;
    let pieceId: any;
    let isComplete = false;
    const supabase = createClient()
    const cardList = await supabase
        .from('card')
        .select('id, rarity')
        .eq('rarity', rarity);

    const collectedCards = await supabase
        .from('collectibles')
        .select('card_id')
        .eq('user_id', user.id);

    const incompleteCards = await supabase
        .rpc('select_incomplete_cards', {'uid': user.id})

    if (!cardList.data) throw DataIsUndefinedError

    let notCollectedCards = cardList.data?.filter(card => !collectedCards.data?.map(collectedCard => collectedCard.card_id).includes(card.id))

    if (notCollectedCards) {
        if (notCollectedCards.length > 0) {
            randomCard = notCollectedCards.at(Math.floor(Math.random() * notCollectedCards.length))
        } else {
            randomCard = cardList?.data.at(Math.floor(Math.random() * cardList.data.length));
        }
    } else {
        randomCard = cardList?.data.at(Math.floor(Math.random() * cardList.data.length));
    }
    console.log(cardList.data, notCollectedCards, randomCard)
    console.log(incompleteCards.data)
    if (incompleteCards.data.find(function (id: string) {
        return randomCard.id === id;
    })) {
        let shardList = await supabase.from('shards')
            .select('piece_id, count')
            .eq('card_id', randomCard.id)
            .eq('user_id', user.id)
        if (shardList.data) {
            console.log(shardList.data.length)
            if (shardList.data.length >= 7) {
                isComplete = true
                pieceId = Math.floor(Math.random() * (maxPieces(randomCard.rarity)))
            } else {
                let iter = 0
                do {
                    pieceId = Math.floor(Math.random() * (maxPieces(randomCard.rarity)))
                    iter++
                } while (shardList.data?.find(shard => shard.piece_id === pieceId) || iter > 100)

            }
        }
    } else {
        pieceId = Math.floor(Math.random() * (maxPieces(randomCard.rarity)))
    }
    await addShard(new ShardDto(randomCard.id, user.id, pieceId, 1))
    if (isComplete) {
        await addCard(randomCard.id, user.id)
    }
    return new ShardDto(randomCard.id, user.id, pieceId, 1)
}

export async function isCompletedCard(cardId: string, rarity: number, user: { id: string }) {
    let rows = await supabase.from('shards')
        .select('count')
        .eq('card_id', cardId)
        .eq('user_id', user.id)
    console.log(rows.data)
    if (!rows.count)
        return null
    return rows.count >= maxPieces(rarity);

}

export async function addShard(shard: ShardDto) {
    let count = await supabase.from('shards')
        .select('count')
        .eq('card_id', shard.cardId)
        .eq('user_id', shard.userId)
        .eq('piece_id', shard.pieceId)

    if (count.data?.length)
        shard.count = count.data.pop()?.count + 1

    return supabase.from('shards').insert({
        user_id: shard.userId,
        card_id: shard.cardId,
        piece_id: shard.pieceId,
        count: shard.count
    });
}

export async function addCard(cardId: string, userId: string) {
    let count = await supabase.from('collectibles')
        .select('count')
        .eq('card_id', cardId)
        .eq('user_id', userId)

    let _count = 1
    if (count.data?.length)
        _count = count.data.pop()?.count + 1

    let res1 = supabase.from('collectibles').insert({
        user_id: userId,
        card_id: cardId,
        count: _count
    });

    let res2 = supabase.from('shards')
        .delete()
        .eq('card_id', cardId)
        .eq('user_id', userId)
    console.log(await Promise.all([res1, res2]))
    return [res1, res2]
}

export default async function Page({params}: { params: { id: string } }) {
    const supabase = createClient();

    const renderShardImage = (rarity: number) => {
        console.log(rarity, typeof (rarity))
        switch (rarity) {
            case 0:
                return (<Image src={common_reveal} alt={"Shard"} width={400} height={534}></Image>)
            case 1:
                return (<Image src={rare_reveal} alt={"Shard"} width={400} height={534}></Image>)
            case 2:
                return (<Image src={legendary_reveal} alt={"Shard"} width={400} height={534}></Image>)
            default:
                return (<Image src={qm_placeholder} alt={"?"} width={400} height={534}></Image>)
        }
    }

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/")
    }


    const qr = await supabase.rpc('is_qr_in_table', {code: params.id});
    const scan = await supabase.rpc('is_scan_in_table', {code: params.id, uid: user.id})
    let valid = false;
    let shard: ShardDto | undefined;

    if (qr.data.valid && !scan.data) {
        const {error} = await supabase
            .from('scans')
            .insert([
                {user_id: user.id, qr_id: qr.data.id},
            ]);
        valid = true;
    }

    shard = await getRandomShardForUser(user, qr.data.rarity)
    let card = await supabase.rpc('select_card_by_id', {id: shard?.cardId})
    console.log(card)
    return (
        <section className={"flex-center flex-col"}>
            {valid ? (<h3 className="highlight text-red-600">Invalid</h3>) : (
                <div className={"column gap-0"}>
                    <h2 className={"w-full text-center shard-title"}>{card.data?.name}</h2>
                    {renderShardImage(+qr.data.rarity)}
                    <h2 className={"w-full text-center"}>#00000{shard?.pieceId}</h2>
                </div>
            )}
            {qr.error && (<h3 className={"highlight text-red-600"}>error: {qr.error.message}</h3>)}
            {scan.error && (<h3 className={"highlight text-red-600"}>error: {scan.error.message}</h3>)}
        </section>
    );
}