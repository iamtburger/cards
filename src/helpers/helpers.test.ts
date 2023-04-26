import { CardComplexity } from '../data/enums';
import {
  configRequestBodyGenerator,
  isResponseInValidFormat,
  parseCards,
} from './helpers';
import { OpenAiCompletionResponse } from '../data/types';

describe('generateRequestBody', () => {
  const MOCK_MODEL = 'rafaello-001';
  const MOCK_TEMPERATURE = 100;

  const generateRequestBody = configRequestBodyGenerator(
    MOCK_MODEL,
    MOCK_TEMPERATURE
  );

  test.each([
    [1000, CardComplexity.LOW, 'Do a flip!'],
    [2000, CardComplexity.MEDIUM, 'Do a flip!'],
    [3000, CardComplexity.HIGH, 'Do a flip!'],
  ])(
    'should return request body with %s as max_tokens',
    (maxTokens, complexity, promptMessage) => {
      const result = generateRequestBody(complexity, promptMessage);

      expect(result).toEqual({
        model: MOCK_MODEL,
        prompt: promptMessage,
        temperature: MOCK_TEMPERATURE,
        max_tokens: maxTokens,
      });
    }
  );
});

describe('parseCards', () => {
  const invalidRegexResponse = {
    data: {
      choices: [
        { text: '[Question4] What do you think?\n\nSomething is missing.' },
      ],
    },
  } as OpenAiCompletionResponse;

  const validRegexResponse = {
    data: {
      choices: [
        {
          text: '[Question1]What do you think?\n[Answer1]Now it is ok.\n\n[Question2]Another question?\n[Answer2]Yes, of course',
        },
      ],
    },
  } as OpenAiCompletionResponse;

  it('should throw an error if regex is not matching', () => {
    expect(() => parseCards(invalidRegexResponse)).toThrowError(
      'Wrong response format'
    );
  });

  it('should return an array of Card objects and removes [Question#] and [Answer#] tags', () => {
    const result = parseCards(validRegexResponse);

    expect(result).toEqual([
      { question: 'What do you think?', answer: 'Now it is ok.' },
      { question: 'Another question?', answer: 'Yes, of course' },
    ]);
  });
});

describe('isResponseInValidFormat', () => {
  it('should throw an error if input length is not equal to defined length', () => {
    const cards = [{ question: 'Two', answer: 'One' }];
    expect(() => isResponseInValidFormat(cards, 2)).toThrowError(
      'Wrong response format'
    );
  });
});
