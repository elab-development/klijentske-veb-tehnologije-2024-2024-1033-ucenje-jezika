export class Recipe {
  public id: number;
  public title: string;
  public image: string;
  public difficulty: string;

  constructor(id: number, title: string, image: string, difficulty: string) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.difficulty = difficulty;
  }
}
