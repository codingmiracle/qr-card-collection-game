import Link from "next/link";

export default function Header() {
    return (
        <header className={"p-4 border-b  border-gray-800 flex justify-between"}>
            <div className={"space-x-6 flex items-center"}>
                <Link className={"text-lg leading-none"} href={"/"}>
                    Home
                </Link>
                <Link href={"/profile"}>
                    Profile
                </Link>
            </div>
        </header>

    );
}