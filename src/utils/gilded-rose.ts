export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Item[];

  constructor(items: Item[] = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      this.updateItemQuality(item);
      this.updateItemSellIn(item);
      this.handleExpiredItem(item);
    });

    return this.items;
  }

  private updateItemQuality(item: Item) {
    switch (true) {
      case item.name === 'Aged Brie':
        this.increaseQuality(item);
        break;
      case item.name === 'Backstage passes to a TAFKAL80ETC concert':
        this.updateBackstagePassQuality(item);
        break;
      case item.name === 'Sulfuras, Hand of Ragnaros':
        break;
      case item.name.startsWith('Conjured'):
        this.decreaseQuality(item, 2);
        break;
      default:
        this.decreaseQuality(item);
        break;
    }
  }

  private updateBackstagePassQuality(item: Item) {
    this.increaseQuality(item);
    if (item.sellIn < 11) this.increaseQuality(item);
    if (item.sellIn < 6) this.increaseQuality(item);

  }

  private updateItemSellIn(item: Item) {
    if (item.name !== 'Sulfuras, Hand of Ragnaros') {
      item.sellIn -= 1;
    }
  }

  private handleExpiredItem(item: Item) {
    if (item.sellIn >= 0) return;

    switch (true) {
      case item.name === 'Aged Brie':
        this.increaseQuality(item);
        break;
      case item.name === 'Backstage passes to a TAFKAL80ETC concert':
        item.quality = 0;
        break;
      case item.name === 'Sulfuras, Hand of Ragnaros':
        break;
      case item.name.startsWith('Conjured'):
        this.decreaseQuality(item, 2);
        break;
      default:
        this.decreaseQuality(item);
        break;
    }
  }

  private increaseQuality(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
  }

  private decreaseQuality(item: Item, amount: number = 1) {
    if (item.quality > 0) {
      item.quality -= amount;
      if (item.quality < 0) item.quality = 0;
    }
  }
}
