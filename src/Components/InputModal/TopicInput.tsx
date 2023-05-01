import React from "react";
import { Box, FormLabel, Input, FormHelperText } from "@chakra-ui/react";

import { createCardsModalLabels } from "../../data/labels";

const TopicInput = ({
  setTopic,
  topic,
}: {
  setTopic: React.Dispatch<React.SetStateAction<string>>;
  topic: string;
}) => (
  <Box paddingTop={1}>
    <FormLabel>{createCardsModalLabels.topic}</FormLabel>
    <Input
      type="text"
      value={topic}
      onChange={(e) => setTopic(e.currentTarget.value)}
      placeholder="A very interesting topic"
    />
    <FormHelperText>{createCardsModalLabels.beNice}</FormHelperText>
  </Box>
);

export default TopicInput;
