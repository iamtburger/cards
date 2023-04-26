import { CardComplexity, CardDifficulty } from '../data/enums';
import { Cards, ChatGPTRequestBody } from '../data/types';

export const MODEL = 'text-davinci-003';
export const TEMPERATURE = 0;
const PROMPT_CONGIG_TEXT =
  'The questions should start with [Question#] and the answers should start with [Answer#] where the # character is the number of the question and answer. A card consists one question and one answer, please separate each card content.';

const difficultyPromptText = {
  [CardDifficulty.EASY]: 'easy',
  [CardDifficulty.MEDIUM]: 'medium',
  [CardDifficulty.HARD]: 'hard',
};

export const generatePromptMessage = (
  topic: string,
  numberOfCards: string,
  difficulty: CardDifficulty
) => {
  return `Create ${numberOfCards} learning cards for spaced repetition learning about ${topic} in a question, 
	answer format. The questions should be ${difficultyPromptText[difficulty]} difficulty. ${PROMPT_CONGIG_TEXT}`;
};

export const configRequestBodyGenerator =
  (model: string, temperature: number) =>
  (length: string, promptMessage: string): ChatGPTRequestBody => {
    const lengthOptions: { [key: string]: number } = {
      [CardComplexity.LOW]: 1000,
      [CardComplexity.MEDIUM]: 2000,
      [CardComplexity.HIGH]: 3000,
    };

    return {
      model: model,
      prompt: promptMessage,
      temperature: temperature,
      max_tokens: lengthOptions[length],
    };
  };

export const generateRequestBody = configRequestBodyGenerator(
  MODEL,
  TEMPERATURE
);

const QUESTION_REGEX = new RegExp(/\[Question([0-9]*)\]/);
const ANSWER_REGEX = new RegExp(/\[Answer([0-9]*)\]/);

export const parseCards = (response): Cards => {
  const responseArray =
    response.data.choices[0].text
      ?.split('\n\n')
      .filter((item) => item !== '') || [];
  return responseArray.map((item) => {
    const question = item.split('\n')[0];
    const answer = item.split('\n')[1];

    if (!QUESTION_REGEX.test(question) || !ANSWER_REGEX.test(answer)) {
      throw new Error('Wrong response format');
    }

    const cleanedQuestion = question.replace(QUESTION_REGEX, '');
    const cleanedAnswer = answer.replace(ANSWER_REGEX, '');

    return {
      question: cleanedQuestion,
      answer: cleanedAnswer,
    };
  });
};

export const isResponseInValidFormat = (
  parsedCards: Cards,
  definedLength: number
) => {
  if (parsedCards.length < definedLength) {
    throw Error('Wrong response format');
  }
};
