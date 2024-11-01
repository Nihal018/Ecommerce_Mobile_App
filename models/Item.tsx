import { User } from "./User";

export class Item {
  id: string;
  description: string;
  name: string;
  imageUri: string;
  cost: number;
  category: string;
  vendorId: string;

  constructor(
    id: string,
    name: string,
    cost: number,
    imageUri: string,
    description: string,
    category: string,
    vendorId: string
  ) {
    this.id = id;
    this.imageUri = imageUri;
    this.description = description;
    this.name = name;
    this.cost = cost;
    this.category = category;
    this.vendorId = vendorId;
  }
}
