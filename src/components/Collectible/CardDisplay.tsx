import Image from "next/image";
import error_icon from "../../../public/error_FILL0_wght400_GRAD0_opsz48.svg";
import {PostgrestError} from "@supabase/supabase-js";

export default function CardDisplay({data, error}: {
    data: any | null
    error: PostgrestError | null
}) {
    if (error || !data) {
        return (
            <div className="card-container w-min p-2 gap-0.5 m-0">
                <Image className="w-full" priority={true} src={error_icon} alt={"!"}/>
                <h3 className="py-1 w-full error">Loading the Card failed</h3>
                {error && (<div className="w-min text-black text-center">{error.message}</div>)}
            </div>
        );
    }
    let cardData = data.pop()
    if (!cardData.img_link) {
        return (
            <div className="card-container w-min p-2 gap-0.5 m-0">
                <Image className="w-full" priority={true} src={error_icon} alt={"!"}/>
                <h3 className="py-1 w-full error">No Image Available</h3>
                {cardData.title && (<h3 className="w-full font-extrabold text-center py-1">{cardData.title}</h3>)}
            </div>
        );
    }
    return (
        <div className="card-container w-min p-0 gap-0.5 m-0">
            <Image className="rounded-md" width={400} height={534} src={cardData?.img_link} alt="Image"/>
            <h3 className="py-1 text-center w-full font-extrabold">{cardData?.title}</h3>
        </div>
    );
}