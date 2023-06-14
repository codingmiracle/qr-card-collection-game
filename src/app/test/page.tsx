import Card from "../../components/Card";
import React from "react";

export default function TestPage() {
    // @ts-ignore
    return (
        <div>
            <section className="flex-center">
                <div className="grid-container">
                    <Card id={'7598102c-0883-4563-bc97-631451fe7487'}/>
                    <Card id={'b6c6ddc6-3429-4a47-be89-3e7b784e083c'}/>
                    <Card id={'b6c6ddc6-3429-4a47-be89-3e7b784e083c'}/>
                </div>
            </section>

            <section className=" w-full h-96"/>
        </div>
    );
}