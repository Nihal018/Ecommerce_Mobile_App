export class CartItem {
  userId: string;
  itemId: string;

  constructor(userId: string, itemId: string) {
    this.userId = userId;
    this.itemId = itemId;
  }
}
