import React, { useState } from 'react';

import InputModal from '../InputModal/InputModal';
import LearningCard from '../LearningCard/LearningCard';
import IntroCard from '../IntroCard/IntroCard';
import { Cards } from '../../data/types';

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
      {cards.length === 0 && <IntroCard />}
      {cards.map(({ question, answer }, index) => (
        <LearningCard
          question={question}
          answer={answer}
          key={`card-${index}`}
        />
      ))}
    </div>
  );
};

export default Pack;
