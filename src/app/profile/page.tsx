import Link from 'next/link';
import {redirect} from 'next/navigation';
import {createClient} from "@/lib/supabase-server";
import SignOut from "@/components/Auth/SignOut";

export default async function Profile() {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <section className="flex-center mt-4">
            <div className="card-container">
                <h2>User Profile</h2>
                <code className="highlight m-0">{user.email}</code>
                <h3>Last Signed In:</h3>
                <code
                    className="highlight m-0">{new Date(user.last_sign_in_at ? user.last_sign_in_at : "").toUTCString()}</code>

                <Link className="button" href="/">
                    Go Home
                </Link>
                <SignOut/>
            </div>
        </section>
    );
}