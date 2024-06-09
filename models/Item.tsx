export class Item {
  id: number;
  description: string;
  name: string;
  imageUri: string;
  cost: number;
  category: string;

  constructor(
    id: number,
    name: string,
    cost: number,
    imageUri: string,
    description: string,
    category: string
  ) {
    this.id = id;
    this.imageUri = imageUri;
    this.description = description;
    this.name = name;
    this.cost = cost;
    this.category = category;
  }
}
