import {createClient} from "@/lib/supabase-server";
import Link from "next/link";

export default async function Page({params}: { params: { id: string } }) {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <section className={"flex-center"}>
                <div className={"column gap-1"}>
                    <h1>You need to be Signed In to proceed</h1>
                    <Link href={"/login"} className={"link"}>Sign In</Link>
                </div>
            </section>
        );
    }


    const qr = await supabase.rpc('is_qr_in_table', {code: params.id});
    const scan = await supabase.rpc('is_scan_in_table', {code: params.id, uid: user.id})
    let validation = (<h3 className="highlight text-red-600">Invalid</h3>);

    if (qr.data.valid && !scan.data) {
        const {error} = await supabase
            .from('scans')
            .insert([
                {user_id: user.id, qr_id: qr.data.id},
            ]);
        validation = (<h3 className="highlight text-green-400">Valid</h3>);
        if (error) console.error(error);
    }

    return (
        <section className={"flex-center"}>
            <div className={"column gap-1"}>
                <h2>draw page</h2>
                <h3 className={"highlight"}>client: {user.id}, {params.id}</h3>
                <h3 className={"highlight"}>qr: {JSON.stringify(qr.data)} scan:{JSON.stringify(scan.data)}</h3>
                {validation}
                {qr.error && (<h3 className={"highlight text-red-600"}>error: {JSON.stringify(qr.error)}</h3>)}

            </div>
        </section>
    );
}