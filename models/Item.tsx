import { User } from "./User";

export class Item {
  id: number;
  description: string;
  name: string;
  imageUri: string;
  cost: number;
  category: string;
  vendorId: number;

  constructor(
    id: number,
    name: string,
    cost: number,
    imageUri: string,
    description: string,
    category: string,
    vendorId: number
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
