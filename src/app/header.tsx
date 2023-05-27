import Link from "next/link";

export default function Header() {
    return (
        <header className={"p-4 border-b  border-gray-800 flex justify-between"}>
            <div className={"space-x-6 flex items-center font-archivo"}>
                <Link className={"text-lg leading-none"} href={"/"}>
                    Home
                </Link>
                <Link href={"/profile"}>
                    Profile
                </Link>
            </div>
            <div className={"items-end space-x-3 "}>
                <Link className={"button-inverse z-10 text-justify py-1.5 font-archivo"} href={"/login"}>
                 LOGIN   
                </Link>
                <Link className={"button-inverse z-10 text-justify py-1.5 font-archivo"} href={"/login"}>
                GET STARTED   
                </Link>
            </div>
        </header>

    );
}