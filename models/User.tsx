export class User {
  id: string;
  description: string;
  name: string;
  email: string;

  constructor(id: string, name: string, description: string, email: string) {
    this.id = id;
    this.description = description;
    this.name = name;
    this.email = email;
  }
}
