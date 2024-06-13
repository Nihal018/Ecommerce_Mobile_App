export class User {
  id: number;
  description: string;
  name: string;
  email: string;
  firebaseId: string;

  constructor(
    id: number,
    name: string,
    description: string,
    email: string,
    firebaseId: string
  ) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.email = email;
    this.firebaseId = firebaseId;
  }
}
