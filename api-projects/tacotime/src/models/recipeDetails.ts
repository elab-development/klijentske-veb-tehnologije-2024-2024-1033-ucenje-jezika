export class RecipeDetails {
  public id: Number;
  public title: string;
  public image: string;
  public difficulty: string;
  public description: string;
  public ingredients: string[];
  public method: string[];
  public portion: string;
  public time: string;

  constructor(
    id: Number,
    title: string,
    image: string,
    difficulty: string,
    description: string,
    ingredients: string[],
    method: string[],
    portion: string,
    time: string
  ) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.difficulty = difficulty;
    this.description = description;
    this.ingredients = ingredients;
    this.method = method;
    this.portion = portion;
    this.time = time;
  }

  getTimeForContent = () => {
    let time: string = '';

    let arrayOfWords: string[] = this.time.split(' ');
    for (let i = 0; i < arrayOfWords.length; i++) {
      if (arrayOfWords[i] === 'min') {
        time = arrayOfWords[i - 1] + ' min';
        return time;
      }

      if (arrayOfWords[i] === 'hours') {
        time = arrayOfWords[i - 1] + ' hours';
        return time;
      }
    }

    if (time === '') {
      return '30 min';
    }
  };

  formatMethod = () => {
    return this.method.map((item) => Object.values(item)[0]);
  };
}
