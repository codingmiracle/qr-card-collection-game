import Loader from "@/components/Loader/Loader";

export default function Loading() {
    return (
        <section className={"flex-center"}>
            <div className="card">
                <Loader/>
            </div>
        </section>
    );
}