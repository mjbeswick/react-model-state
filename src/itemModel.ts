import { Model } from './model';

export class ItemModel extends Model {
  public items: string[] = [];

  public addItem(name: string) {
    this.items.push(name);
  }
}
