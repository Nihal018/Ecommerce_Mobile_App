export class User {
  id: number;
  description: string;
  name: string;
  imageUri: string;
  email: string;

  constructor(
    id: number,
    name: string,
    imageUri: string,
    description: string,
    email: string
  ) {
    this.id = id;
    this.imageUri = imageUri;
    this.description = description;
    this.name = name;
    this.email = email;
  }
}
