export interface Question {
  _id: string;
  examId: string;
  text: string;
  options: string[];
  correctAnswer: string;
}
