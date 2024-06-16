export class CartItem {
  userId: number;
  itemId: number;

  constructor(userId: number, itemId: number) {
    this.userId = userId;
    this.itemId = itemId;
  }
}
