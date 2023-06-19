import {createClient} from "@/service/supabase/supabase-server";
import {redirect} from "next/navigation";
import ShardDto from "@/service/draw/shard.dto";
import Image from "next/image";
import common_reveal from '../../../../public/shard-reveal-common.png'
import rare_reveal from '../../../../public/shard-reveal-rare.png'
import legendary_reveal from '../../../../public/shard-reveal-legendary.png'
import qm_placeholder from '../../../../public/qm_placeholder.png'
import {getRandomShardForUser} from "@/service/draw/shard.service";

export default async function Page({params}: { params: { id: string } }) {
    const supabase = createClient();
    const renderShardImage = (rarity: number) => {
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
    let card;

    if (qr.data.valid && !scan.data) {
        const {error} = await supabase
            .from('scans')
            .insert([
                {user_id: user.id, qr_id: qr.data.id},
            ]);
        if (error) throw new Error(error.message)
        valid = true;
        shard = await getRandomShardForUser(user, qr.data.rarity)
        card = await supabase.rpc('select_card_by_id', {id: shard?.cardId})
    }
    return (
        <section className={"flex-center flex-col"}>
            {valid ? (
                <div className={"column gap-0"}>
                    {card && (<h2 className={"w-full text-center shard-title"}>{card.data?.name}</h2>)}
                    {renderShardImage(+qr.data.rarity)}
                    <h2 className={"w-full text-center"}>#00000{shard?.pieceId}</h2>
                </div>
            ) : (<h3 className="highlight text-red-600">Invalid</h3>)}
            {qr.error && (<h3 className={"highlight text-red-600"}>error: {qr.error.message}</h3>)}
            {scan.error && (<h3 className={"highlight text-red-600"}>error: {scan.error.message}</h3>)}
        </section>
    );
}