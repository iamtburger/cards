import React, { useState } from "react";

import InputModal from "../InputModal";
import FlippableCard from "../FlippableCard";
import IntroCard from "../IntroCard/";
import { Cards } from "../../data/types";

import "../../App.css";
import { Box, SimpleGrid } from "@chakra-ui/react";

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
      {/* <SimpleGrid columns={[1, 2, 3]} spacing={5}> */}
      <SimpleGrid
        columns={[1, 1, 2, 3, 3]}
        // columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        spacing={5}
      >
        {cards.map(({ question, answer }, index) => (
          <Box>
            <FlippableCard
              question={question}
              answer={answer}
              key={`card-${index}`}
            />
          </Box>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Pack;
