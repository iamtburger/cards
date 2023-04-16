import { CardComplexity, CardDifficulty, CardNumber } from './enums';

export const createCardsModalLabels = {
  header: 'Create your pack of learning cards',
  topic: 'Gimme a topic!',
  beNice: 'Be nice! If you want to break the app, you probably will be able.',
  generatePack: 'Generate Pack',
  generatePackIsLoading: "...so, how's your day?",
};

export const cardDifficultyLabels = {
  inputLabel: 'How difficult should the questions be?',
  options: {
    [CardDifficulty.EASY]: 'Easy',
    [CardDifficulty.MEDIUM]: 'Medium',
    [CardDifficulty.HARD]: 'Hard',
  },
};

export const cardComplexityLabels = {
  inputLabel: 'How detailed should the answers be?',
  options: {
    [CardComplexity.LOW]: 'Low',
    [CardComplexity.MEDIUM]: 'Medium',
    [CardComplexity.HIGH]: 'High',
  },
};

export const numberOfCardsLabels = {
  inputLabel: 'How many cards do you want?',
  options: {
    [CardNumber.FIVE]: '5',
    [CardNumber.EIGHT]: '8',
    [CardNumber.TEN]: '10',
  },
};
