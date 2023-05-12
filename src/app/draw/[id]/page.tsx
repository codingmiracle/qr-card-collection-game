export default function Page({params}: {params: {id: string}}) {
    return (
        <>
            <h1>Here comes the draw</h1>
            <h3>ID: {params.id}</h3>
        </>
    );
}