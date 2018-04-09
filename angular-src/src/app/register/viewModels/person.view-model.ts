export class PersonViewModel{
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(p: any){
    this.name     = p.name !== null ? p.name : null;
    this.username = p.username !== null ? p.username : null;
    this.email    = p.email !== null ? p.email : null;
    this.password = p.password !== null ? p.password : null;
  }
}
