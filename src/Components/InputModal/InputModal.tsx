import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
} from '@chakra-ui/react';

import openai from '../../../openAi';
import {
  cardComplexityLabels,
  cardDifficultyLabels,
  createCardsModalLabels,
  numberOfCardsLabels,
} from '../../data/labels';
import { CardComplexity, CardDifficulty, CardNumber } from '../../data/enums';
import { Cards, OpenAiCompletionResponse } from '../../data/types';
import {
  generatePromptMessage,
  generateRequestBody,
  parseCards,
} from '../../helpers/helpers';

const InputOverlay = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
  />
);

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCards: React.Dispatch<React.SetStateAction<Cards>>;
}

const InputModal = ({ isOpen, onClose, setCards }: InputModalProps) => {
  const [topic, setTopic] = useState('');
  const [numberOfCards, setNumberOfCards] = useState('5');
  const [complexity, setComplexity] = useState(CardComplexity.LOW);
  const [difficulty, setDifficulty] = useState(CardDifficulty.EASY);
  const [isLoading, setIsLoading] = useState(false);

  const resetInputs = useCallback(() => {
    setTopic('');
    setNumberOfCards(CardNumber.FIVE);
    setComplexity(CardComplexity.LOW);
    setDifficulty(CardDifficulty.EASY);
  }, []);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={MODAL_SIZE}
      closeOnOverlayClick={false}
    >
      <InputOverlay />
      <ModalContent padding={10}>
        <ModalHeader>{createCardsModalLabels.header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Box paddingTop={1}>
              <FormLabel>{createCardsModalLabels.topic}</FormLabel>
              <Input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.currentTarget.value)}
              />
              <FormHelperText>{createCardsModalLabels.beNice}</FormHelperText>
            </Box>
            <Box paddingTop={5}>
              <FormLabel>{numberOfCardsLabels.inputLabel}</FormLabel>
              <Select
                value={numberOfCards}
                onChange={(e) => setNumberOfCards(e.currentTarget.value)}
              >
                <option value={CardNumber.FIVE}>
                  {numberOfCardsLabels.options[5]}
                </option>
                <option value={CardNumber.EIGHT}>
                  {numberOfCardsLabels.options[8]}
                </option>
                <option value={CardNumber.TEN}>
                  {numberOfCardsLabels.options[10]}
                </option>
              </Select>
            </Box>
            <Box paddingTop={5}>
              <FormLabel>{cardComplexityLabels.inputLabel}</FormLabel>
              <Select
                value={complexity}
                onChange={(e) =>
                  setComplexity(e.currentTarget.value as CardComplexity)
                }
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
            <Box paddingTop={5}>
              <FormLabel>{cardDifficultyLabels.inputLabel}</FormLabel>
              <Select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.currentTarget.value as CardDifficulty)
                }
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
            <Button
              marginTop={30}
              isLoading={isLoading}
              loadingText={"...so, how's your day?"}
              onClick={() => {
                setIsLoading(true);
                openai
                  .createCompletion(
                    generateRequestBody(
                      complexity,
                      generatePromptMessage(topic, numberOfCards, difficulty)
                    )
                  )
                  .then((res) => {
                    return parseCards(res as OpenAiCompletionResponse);
                  })
                  .then((cards) => setCards(cards))
                  .finally(() => {
                    setIsLoading(false);
                    resetInputs();
                    onClose();
                  });
              }}
            >
              Generate Pack
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const MODAL_SIZE = 'xl';

export default InputModal;
