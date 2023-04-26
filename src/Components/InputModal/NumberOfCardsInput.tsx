import React from 'react';
import { Box, FormLabel, Select } from '@chakra-ui/react';

import { CardNumber } from '../../data/enums';
import { numberOfCardsLabels } from '../../data/labels';

const NumberOfCardsInput = ({
  setNumberOfCards,
  numberOfCards,
}: {
  setNumberOfCards: React.Dispatch<React.SetStateAction<string>>;
  numberOfCards: string;
}) => (
  <Box paddingTop={5}>
    <FormLabel>{numberOfCardsLabels.inputLabel}</FormLabel>
    <Select
      value={numberOfCards}
      onChange={(e) => setNumberOfCards(e.currentTarget.value)}
    >
      <option value={CardNumber.FIVE}>{numberOfCardsLabels.options[5]}</option>
      <option value={CardNumber.EIGHT}>{numberOfCardsLabels.options[8]}</option>
      <option value={CardNumber.TEN}>{numberOfCardsLabels.options[10]}</option>
    </Select>
  </Box>
);

export default NumberOfCardsInput;
