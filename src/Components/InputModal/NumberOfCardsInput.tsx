import React from "react";
import { Box, FormLabel, Select } from "@chakra-ui/react";

import { CardNumber } from "../../data/enums";
import { numberOfCardsLabels } from "../../data/labels";

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
      <option value={CardNumber.SIX}>{numberOfCardsLabels.options[6]}</option>
      <option value={CardNumber.NINE}>{numberOfCardsLabels.options[9]}</option>
      <option value={CardNumber.TWELVE}>
        {numberOfCardsLabels.options[12]}
      </option>
    </Select>
  </Box>
);

export default NumberOfCardsInput;
