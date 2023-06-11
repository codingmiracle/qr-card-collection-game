import supabase from "@/lib/supabase-browser";
import error_icon from '../../../public/error_FILL0_wght400_GRAD0_opsz48.svg'
import Image from "next/image";

export default async function Collectible({id}: { id: string }) {

    let {data, error} = await supabase.rpc('select_card_by_id', {'id': id})
    if (error) {
        return (
            <div className="card-container p-2 gap-0.5 ">
                <Image className="w-full" priority={true} src={error_icon} alt={"!"}/>
                <h3 className="py-1 w-full error">Loading the Card failed</h3>
                <div className="w-min text-black text-center">{error.message}</div>
            </div>
        );
    }
    return (
        <div className="card-container p-2 gap-0.5">
            <img className="rounded-md h-96" src={data.img_link} alt="Image"/>
            <h3 className="py-1 w-full">{data.title}</h3>
            <button className="button w-full">send</button>
        </div>
    );
}