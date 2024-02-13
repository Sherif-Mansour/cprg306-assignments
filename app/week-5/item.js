export default function Item({name, quantity, category}) {
    return (
        <section className="p-2 m-4 bg-slate-300 max-w-sm">
            <ul>
                <li>
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p>Buy {quantity} in {category}</p>
                </li>
            </ul>
        </section>
    )
}