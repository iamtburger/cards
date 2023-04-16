import React from 'react';
import { Box, FormLabel, Select } from '@chakra-ui/react';

import { CardComplexity } from '../../data/enums';
import { cardComplexityLabels } from '../../data/labels';

const ComplexityInput = ({
  setComplexity,
  complexity,
}: {
  setComplexity: React.Dispatch<React.SetStateAction<CardComplexity>>;
  complexity: CardComplexity;
}) => (
  <Box paddingTop={5}>
    <FormLabel>{cardComplexityLabels.inputLabel}</FormLabel>
    <Select
      value={complexity}
      onChange={(e) => setComplexity(e.currentTarget.value as CardComplexity)}
    >
      <option value={CardComplexity.LOW}>
        {cardComplexityLabels.options.LOW}
      </option>
      <option value={CardComplexity.MEDIUM}>
        {cardComplexityLabels.options.MEDIUM}
      </option>
      <option value={CardComplexity.HIGH}>
        {cardComplexityLabels.options.HIGH}
      </option>
    </Select>
  </Box>
);

export default ComplexityInput;
