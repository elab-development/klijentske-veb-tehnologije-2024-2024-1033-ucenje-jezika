interface Question {
  questionText: string;
  questionImage: string;
}

export class Course {
  public id: number;
  public name: string;
  public noOfQuestions: number;
  public questions: Question[];

  constructor(
    id: number,
    name: string,
    noOfQuestions: number,
    questions: Question[]
  ) {
    this.id = id;
    this.name = name;
    this.noOfQuestions = noOfQuestions;
    this.questions = questions;
  }
}

export type StorageCourse = {
  courseId: number;
  languageId: number;
  marks: number;
};
