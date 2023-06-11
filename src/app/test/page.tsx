import Collectible from "@/components/Collectible";
import React from "react";

export default function TestPage() {
    return (
        <div>
            <section className="flex-center">
                <div className="grid-container">
                    <Collectible id={'7598102c-0883-4563-bc97-631451fe7487'}/>
                    <Collectible id={'b6c6ddc6-3429-4a47-be89-3e7b784e083c'}/>
                    <Collectible id={'abcsdghlkjdahgladkfhjökadjhgköhjadfg'}/>
                </div>
            </section>
            <section className=" w-full h-96"/>
        </div>
    );
}