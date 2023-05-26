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

    const {data, error} = await supabase.rpc('is_qr_code_in_table', {code: params.id});

    return (
        <section className={"flex-center"}>
            <div className={"column gap-1"}>
                <h2>draw page</h2>
                <h3 className={"highlight"}>valid: {JSON.stringify(data)}</h3>
                {error && (<h3 className={"highlight"}>error: {JSON.stringify(error)}</h3>)}
            </div>
        </section>
    );
}