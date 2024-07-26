import { useState } from "react";
import { Item, GildedRose } from "../../utils/gilded-rose";

const sampleItems: Item[] = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new Item("Conjured Mana Cake", 3, 6),
];

const createDefaultItems = (items: Item[]) => {
  if (typeof structuredClone === "function") {
    return structuredClone(items);
  }
  return JSON.parse(JSON.stringify(items));
};

export default function Rose() {
  const [items, setItems] = useState(createDefaultItems(sampleItems));

  const handleUpdateItems = () => {
    const gildedRose = new GildedRose(items);
    setItems([...gildedRose.updateQuality()]);
  };

  const handleResetItems = () => {
    setItems(createDefaultItems(sampleItems));
  };

  return (
    <>
      <h1>Gilded Rose</h1>
      <ul>Sample Items in different categories</ul>
      {items.map(({ name, sellIn, quality }: Item, i: number) => {
        return (
          <li key={i}>
            <strong>Name: </strong> {name}, <strong>SelIn: </strong> {sellIn},{" "}
            <strong>Quality: </strong>
            {quality}
          </li>
        );
      })}
      <br />
      <button onClick={handleUpdateItems}>Update Quality</button>
      <br />
      <br />
      <button onClick={handleResetItems}>Reset</button>
    </>
  );
}
