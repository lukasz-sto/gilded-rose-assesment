import { Item, GildedRose } from './gilded-rose'; 

describe('Gilded Rose', () => {

  it('should decrease quality and sellIn for normal items', () => {
    const items = [new Item("+5 Dexterity Vest", 10, 20)];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  it('should not decrease quality below zero', () => {
    const items = [new Item("Elixir of the Mongoose", 5, 0)];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('should increase quality of Aged Brie up to 50', () => {
    const items = [new Item("Aged Brie", 2, 0)];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(1);

    gildedRose.updateQuality(); 
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(2);

    gildedRose.updateQuality(); 
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(4);

    for (let i = 0; i < 100; i++) { // Arbitrarily high number to ensure quality hits the cap
        gildedRose.updateQuality();
    }

    gildedRose.updateQuality(); // after several updates
    expect(items[0].quality).toBe(50); // should not exceed 50
  });

  it('should not change Sulfuras quality or sellIn', () => {
    const items = [
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80)
    ];
    const gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(80);
    expect(items[1].sellIn).toBe(-1);
    expect(items[1].quality).toBe(80);
  });

  it('should increase quality of Backstage passes based on sellIn', () => {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
    ];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality(); // Day 1
    expect(items[0].sellIn).toBe(14);
    expect(items[0].quality).toBe(21);

    gildedRose.updateQuality(); // Day 2
    expect(items[1].sellIn).toBe(8);
    expect(items[1].quality).toBe(50); // Capped at 50

    gildedRose.updateQuality(); // Day 3
    expect(items[2].sellIn).toBe(2);
    expect(items[2].quality).toBe(50); // Capped at 50

    gildedRose.updateQuality(); // After concert
    expect(items[0].sellIn).toBe(11);
    expect(items[0].quality).toBe(24);

    expect(items[1].sellIn).toBe(6);
    expect(items[1].quality).toBe(50);

    expect(items[2].sellIn).toBe(1);
    expect(items[2].quality).toBe(50);
  });

  it('should decrease quality of Conjured items twice as fast', () => {
    const items = [new Item("Conjured Mana Cake", 3, 6)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality(); // Day 1
    expect(items[0].sellIn).toBe(2);
    expect(items[0].quality).toBe(4);

    gildedRose.updateQuality(); // Day 2
    expect(items[0].sellIn).toBe(1);
    expect(items[0].quality).toBe(2);

    gildedRose.updateQuality(); // Day 3
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(0);
  });

  it('should handle Conjured items correctly after sellIn date', () => {
    const items = [new Item("Conjured Mana Cake", 0, 12)];
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality(); // Day 1
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);

    gildedRose.updateQuality(); // Day 2
    expect(items[0].sellIn).toBe(-2);
    expect(items[0].quality).toBe(4);

    gildedRose.updateQuality(); // Day 3
    expect(items[0].sellIn).toBe(-3);
    expect(items[0].quality).toBe(0);
  });
});
