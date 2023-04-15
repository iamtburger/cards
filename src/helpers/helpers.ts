import { CardComplexity, CardDifficulty } from '../data/enums';
import { OpenAiCompletionResponse } from '../data/types';

const MODEL = 'text-davinci-003';
const TEMPERATURE = 0;
const PROMPT_CONGIG_TEXT =
  'The questions should start with [Question#] and the answers should start with [Answer#] where the # character is the number of the question and answer. A card consists one question and one answer, please separate each card content.';

const difficultyPromptText = {
  [CardDifficulty.EASY]: 'easy',
  [CardDifficulty.MEDIUM]: 'medium',
  [CardDifficulty.HARD]: 'hard',
};

interface ChatGPTRequestBody {
  model: string;
  prompt: string;
  temperature: number;
  max_tokens: number;
}

export const generatePromptMessage = (
  topic: string,
  numberOfCards: string,
  difficulty: CardDifficulty
) => {
  return `Create ${numberOfCards} learning cards for spaced repetition learning about ${topic} in a question, 
	answer format. The questions should be ${difficultyPromptText[difficulty]} difficulty. ${PROMPT_CONGIG_TEXT}`;
};

export const generateRequestBody = (
  length: string,
  promptMessage: string
): ChatGPTRequestBody => {
  const lengthOptions: { [key: string]: number } = {
    [CardComplexity.LOW]: 1000,
    [CardComplexity.MEDIUM]: 2000,
    [CardComplexity.HIGH]: 3000,
  };

  return {
    model: MODEL,
    prompt: promptMessage,
    temperature: TEMPERATURE,
    max_tokens: lengthOptions[length],
  };
};

export const parseCards = (response: OpenAiCompletionResponse) => {
  const responseArray =
    response.data.choices[0].text
      ?.split('\n\n')
      .filter((item) => item !== '') || [];
  return responseArray.map((item) => ({
    question: item.split('\n')[0],
    answer: item.split('\n')[1],
  }));
};
