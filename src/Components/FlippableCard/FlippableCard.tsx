import React, { useState } from "react";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

interface FlippableCardProps {
  question: string;
  answer: string;
}

const FlippableCard = ({ question, answer }: FlippableCardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const flipCard = () => setShowAnswer((prevState) => !prevState);

  return showAnswer ? (
    <CardSide title={question} text={answer} onClick={flipCard} />
  ) : (
    <CardSide title="Question" text={question} onClick={flipCard} />
  );
};

const CardSide = ({
  title,
  text,
  onClick,
}: {
  title: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <Card
      size="lg"
      backgroundColor="gray.100"
      variant="elevated"
      align="center"
      w={[450, 450, 330, 330]}
      m={3}
      minH={350}
      maxH={"60vh"}
      onClick={onClick}
    >
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{text}</Text>
      </CardBody>
    </Card>
  );
};

export default FlippableCard;
