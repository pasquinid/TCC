export class CredentialsViewModel{
    username: string;
    password: string;
  
    constructor(p: any){
      this.username = p.username !== null ? p.username : null;
      this.password = p.password !== null ? p.password : null;
    }
  }
  