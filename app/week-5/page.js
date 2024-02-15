import ItemList from "./item-list-extra.js";
import itemList from "./item-list.js";

export default function Page() {
  return (
    <main>
      <h1 className="text-3xl font-bold m-2">Shopping List</h1>
      <ItemList />
    </main>
  );
}
