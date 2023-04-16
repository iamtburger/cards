import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

interface LearningCardProps {
  question: string;
  answer: string;
}

const LearningCard = ({ question, answer }: LearningCardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return showAnswer ? (
    <CardSide
      title={question}
      text={answer}
      flipCard={() => setShowAnswer(false)}
    />
  ) : (
    <CardSide
      title="Question"
      text={question}
      flipCard={() => setShowAnswer(true)}
    />
  );
};

const CardSide = ({
  title,
  text,
  flipCard,
}: {
  title: string;
  text: string;
  flipCard: () => void;
}) => {
  return (
    <Card
      size="lg"
      backgroundColor="gray.100"
      variant="elevated"
      align="center"
      w={[250, 400, 600, 900]}
      m={3}
      minH={350}
      maxH={'60vh'}
      onClick={flipCard}
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

export default LearningCard;
