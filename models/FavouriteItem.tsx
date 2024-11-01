export class FavouriteItem {
  userId: string;
  itemId: string;

  constructor(userId: string, itemId: string) {
    this.userId = userId;
    this.itemId = itemId;
  }
}
