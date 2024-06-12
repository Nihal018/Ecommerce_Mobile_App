export class User {
  id: number;
  description: string;
  name: string;
  email: string;

  constructor(id: number, name: string, description: string, email: string) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.email = email;
  }
}
