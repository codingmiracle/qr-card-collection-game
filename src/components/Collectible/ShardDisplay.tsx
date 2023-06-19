import Image from "next/image";
import error_icon from "../../../public/error_FILL0_wght400_GRAD0_opsz48.svg";
import {maxPieces} from "@/components/Collectible/utils";

function renderShardList(shardListData: any[], rarity: number) {
    let shardOverview = []
    for (let pieceId = 0; pieceId < maxPieces(rarity); pieceId++) {
        let shardWithId = shardListData.find(element => element.piece_id == pieceId)
        if (!shardWithId)
            shardWithId = {piece_id: pieceId, count: 0}
        shardOverview.push(shardWithId)
    }
    return (
        <div className={"w-full"}>
            <div className={"row"}>
                <ul className={"space-y-1 w-1/2"}>
                    {shardOverview.map((shard, index) => (
                        <li key={index}>
                            {shard.count ? (
                                <div className={"highlight text-green-500"}>#00000{shard.piece_id}</div>) : (
                                <div className={"highlight text-red-600"}>#00000{shard.piece_id}</div>)}
                            <div className={"rounded-full text-amber-600 ml-8"}>{shard.count > 0 ? (
                                <div className={"indicator"}>
                                    <div>{shard.count}</div>
                                </div>) : null}</div>
                        </li>
                    ))}
                </ul>
                <h3 className={"self-start p-0 w-1/2 text-end"}>{shardListData.length}/{maxPieces(rarity)}</h3>
            </div>
        </div>
    );
}

export default function ShardDisplay({cardData, shardList}: {
    cardData: any | null
    shardList: any | null
}) {
    if (cardData.error || shardList.error) {
        return (
            <div className={"card-container p-2 gap-0.5 m-0"}>
                <Image className="w-full" priority={true} src={error_icon} alt={"!"}/>
                <h3 className="py-1 w-full error">Loading the Shards failed</h3>
                {cardData.error && (<div className="w-min text-black text-center">{cardData.error.message}</div>)}
                {shardList.error && (<div className="w-min text-black text-center">{shardList.error.message}</div>)}
            </div>
        );
    }
    let card = cardData.data.pop()
    return (
        <div className={"card-container p-2 gap-0.5 m-0"}>
            <h3 className={"py-1"}>{card.name}</h3>
            {renderShardList(shardList.data, card.rarity)}
        </div>
    );
}