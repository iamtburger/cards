import React, { useState } from 'react';

import InputModal from '../InputModal/InputModal';
import { Cards } from '../../data/types';
import LearningCard from '../LearningCard/LearningCard';

import '../../App.css';

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
      {cards.length === 0 && (
        <LearningCard
          question="Why don't you click on the 'Generate pack' button?"
          answer="Come on! I know you want to."
        />
      )}
      {cards.map(({ question, answer }, index) => (
        <LearningCard
          question={question}
          answer={answer}
          flippable
          key={`card-${index}`}
        />
      ))}
    </div>
  );
};

export default Pack;
