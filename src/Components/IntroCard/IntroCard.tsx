import React from "react";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

const IntroCard = () => {
  return (
    <Card
      size="lg"
      backgroundColor="gray.100"
      variant="elevated"
      align="center"
      w={[250, 400, 600, 900]}
      m={3}
      minH={350}
      maxH={"60vh"}
    >
      <CardHeader>
        <Heading size="md">Let&apos;s play a game!</Heading>
      </CardHeader>
      <CardBody>
        <Text>{bodyText}</Text>
      </CardBody>
    </Card>
  );
};

export default IntroCard;

const bodyText =
  "Why don't you click on the 'New pack' button?\nI know you want to.";
