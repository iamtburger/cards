export interface Card {
  question: string;
  answer: string;
}

export type Cards = Card[];

export interface ChatGPTRequestBody {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
}
