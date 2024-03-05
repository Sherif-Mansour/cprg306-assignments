export default function Item({ name, quantity, category, onSelect }) {
  return (
    <section
      className="p-2 m-4 bg-slate-300 max-w-sm hover:bg-orange-500 cursor-pointer"
      onClick={() => onSelect(name)}
    >
      <ul>
        <li>
          <h2 className="text-xl font-bold">{name}</h2>
          <p>
            Buy {quantity} in {category}
          </p>
        </li>
      </ul>
    </section>
  );
}
