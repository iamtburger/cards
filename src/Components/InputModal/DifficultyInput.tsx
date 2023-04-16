import React from 'react';
import { Box, FormLabel, Select } from '@chakra-ui/react';

import { CardDifficulty } from '../../data/enums';
import { cardDifficultyLabels } from '../../data/labels';

const DifficultyInput = ({
  setDifficulty,
  difficulty,
}: {
  setDifficulty: React.Dispatch<React.SetStateAction<CardDifficulty>>;
  difficulty: CardDifficulty;
}) => (
  <Box paddingTop={5}>
    <FormLabel>{cardDifficultyLabels.inputLabel}</FormLabel>
    <Select
      value={difficulty}
      onChange={(e) => setDifficulty(e.currentTarget.value as CardDifficulty)}
    >
      <option value={CardDifficulty.EASY}>
        {cardDifficultyLabels.options.EASY}
      </option>
      <option value={CardDifficulty.MEDIUM}>
        {cardDifficultyLabels.options.MEDIUM}
      </option>
      <option value={CardDifficulty.HARD}>
        {cardDifficultyLabels.options.HARD}
      </option>
    </Select>
  </Box>
);

export default DifficultyInput;
