export interface User {
  id: number;
  name: string;
  email: string;
}

export class Member {
  public user: User;
  public job: String;
  public description: String;
  public image: String;

  constructor(user: User, job: String, description: String, image: String) {
    this.user = user;
    this.job = job;
    this.description = description;
    this.image = image;
  }
}
