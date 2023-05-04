import React, { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import InputModal from "../InputModal";
import FlippableCard from "../FlippableCard";
import IntroCard from "../IntroCard/";
import { Cards } from "../../data/types";

import "../../App.css";

const Pack = ({
  isModalOpen,
  onCloseModal,
}: {
  isModalOpen: boolean;
  onCloseModal: () => void;
}) => {
  const [cards, setCards] = useState<Cards>([]);

  return (
    <div className="body-container">
      <InputModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        setCards={setCards}
      />
      {cards.length === 0 && <IntroCard />}
      <SimpleGrid columns={[1, 1, 2, 3, 3]} spacing={5}>
        {cards.map(({ question, answer }, index) => (
          <Box key={`card-${index}`}>
            <FlippableCard question={question} answer={answer} />
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Pack;
