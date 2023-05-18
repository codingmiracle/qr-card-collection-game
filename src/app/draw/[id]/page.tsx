import {createClient} from "@/lib/supabase-server";
import Link from "next/link";

export default async function Page({params}: { params: { id: string } }) {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div>
                <h1>You need to be Signed In to proceed</h1>
                <Link href={"/login"}>Sign In</Link>
            </div>
        );
    }


    return (
        <>
            <h1>Here comes the draw</h1>
            <h3>ID: {params.id}</h3>
        </>
    );
}