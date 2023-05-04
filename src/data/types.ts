import { CardComplexity, CardDifficulty, CardNumber } from "./enums";

export interface Card {
  question: string;
  answer: string;
}

export type Cards = Card[];

export interface ChatGPTRequestBody {
  complexity: CardComplexity;
  topic: string;
  numberOfCards: CardNumber;
  difficulty: CardDifficulty;
  mistery?: boolean;
}
