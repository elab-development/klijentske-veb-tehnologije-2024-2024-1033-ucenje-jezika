export class Message {
  public name: string;
  public email: string;
  public text: string;

  constructor(name: string, email: string, text: string) {
    this.name = name;
    this.email = email;
    this.text = text;
  }
}

export const userMessages: Message[] = [];
