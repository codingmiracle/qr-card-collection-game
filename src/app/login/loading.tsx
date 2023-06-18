import Loader from "@/components/Loader/Loader";

export default function Loading() {
    return (
        <section className={"flex-center"}>
            <div className={"card-container"}>
                <Loader/>
            </div>
        </section>
    );
}