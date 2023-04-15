import { AxiosResponse } from 'axios';
import { CreateCompletionResponse } from 'openai';

export type OpenAiCompletionResponse = AxiosResponse<
  CreateCompletionResponse,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;

export interface Card {
  question: string;
  answer: string;
}

export type Cards = Card[];
