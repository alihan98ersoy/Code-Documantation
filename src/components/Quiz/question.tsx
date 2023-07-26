import questionsData from "./questions.json";

export interface Question {
  questionText: string;
  answerOptions: AnswerOption[];
}

interface AnswerOption {
  answerText: string;
  isCorrect: boolean;
}

const questions: Array<Question> = questionsData as Question[];

export default questions;
