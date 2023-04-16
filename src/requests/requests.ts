import openai from '../../openAi';
import { CardComplexity } from '../data/enums';
import { ChatGPTRequestBody } from '../data/types';
import { generateRequestBody } from '../helpers/helpers';

export const createCompletion = (requestBody: ChatGPTRequestBody) =>
  openai.createCompletion(requestBody);

export const generateCards = (
  complexity: CardComplexity,
  promptMessage: string
) => createCompletion(generateRequestBody(complexity, promptMessage));
