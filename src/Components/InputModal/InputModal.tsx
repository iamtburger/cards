import React, { useCallback, useState } from "react";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  Switch,
  FormLabel,
} from "@chakra-ui/react";

import TopicInput from "./TopicInput";
import NumberOfCardsInput from "./NumberOfCardsInput";
import ComplexityInput from "./ComplexityInput";
import DifficultyInput from "./DifficultyInput";
import { createCardsModalLabels } from "../../data/labels";
import { Cards } from "../../data/types";
import { CardComplexity, CardDifficulty, CardNumber } from "../../data/enums";
import { generateCards } from "../../requests";

const InputOverlay = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(20deg)"
  />
);

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCards: React.Dispatch<React.SetStateAction<Cards>>;
}

const InputModal = ({ isOpen, onClose, setCards }: InputModalProps) => {
  const [topic, setTopic] = useState("");
  const [numberOfCards, setNumberOfCards] = useState(CardNumber.SIX);
  const [complexity, setComplexity] = useState(CardComplexity.LOW);
  const [difficulty, setDifficulty] = useState(CardDifficulty.EASY);
  const [mistery, setMistery] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const resetInputs = useCallback(() => {
    setTopic("");
    setNumberOfCards(CardNumber.SIX);
    setComplexity(CardComplexity.LOW);
    setDifficulty(CardDifficulty.EASY);
  }, []);

  const onGenerateCardsClick = useCallback(async () => {
    try {
      setIsLoading(true);
      setCards([]);
      const result = await generateCards({
        complexity,
        topic,
        numberOfCards,
        difficulty,
        mistery,
      });
      setCards(JSON.parse(result.content).questions);
      setIsLoading(false);
      resetInputs();
      onClose();
    } catch (e) {
      console.error("Something went wrong while generating the cards", e);
      setIsLoading(false);
      toast({
        title: "Something went wrong!",
        description: "Try again later! Or not. It's up to you.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [topic, numberOfCards, difficulty, complexity]);

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
            <FormLabel htmlFor="mistery-switch" mb="1">
              I wonder what does this switch do...
            </FormLabel>
            <Switch
              id="mistery-switch"
              onChange={() => setMistery((prevState) => !prevState)}
              isChecked={mistery}
            />
            <TopicInput setTopic={setTopic} topic={topic} />
            <NumberOfCardsInput
              setNumberOfCards={setNumberOfCards}
              numberOfCards={numberOfCards}
            />
            <ComplexityInput
              setComplexity={setComplexity}
              complexity={complexity}
            />
            <DifficultyInput
              setDifficulty={setDifficulty}
              difficulty={difficulty}
            />
            <Button
              marginTop={30}
              isLoading={isLoading}
              loadingText={createCardsModalLabels.generatePackIsLoading}
              backgroundColor="red.600"
              color="white"
              onClick={onGenerateCardsClick}
            >
              {createCardsModalLabels.generatePack}
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const MODAL_SIZE = "xl";

export default InputModal;
