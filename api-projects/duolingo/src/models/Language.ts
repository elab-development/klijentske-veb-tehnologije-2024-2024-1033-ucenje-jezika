export class Language {
  public id: number;
  public name: string;
  public image: string;
  public translateCode: string;

  constructor(id: number, name: string, image: string, translateCode: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.translateCode = translateCode;
  }
}
