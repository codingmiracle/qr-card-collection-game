import Link from 'next/link';
import {redirect} from 'next/navigation';
import {createClient} from "@/lib/supabase-server";
import SignOut from "@/components/SignOut";

export default async function Profile() {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/');
    }

    // @ts-ignore
    return (
        <div className="card">
            <h2>User Profile</h2>
            <code className="highlight">{user.email}</code>
            <div className="heading">Last Signed In:</div>
            <code
                className="highlight">{new Date(user.last_sign_in_at ? user.last_sign_in_at : "").toUTCString()}</code>
            <Link className="button" href="/">
                Go Home
            </Link>
            <SignOut/>
        </div>
    );
}