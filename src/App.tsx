import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

import Navbar from './Components/Navbar/Navbar';
import Pack from './Components/Pack/Pack';

import './App.css';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Navbar onOpen={onOpen} />
      <Pack isModalOpen={isOpen} onCloseModal={onClose} />
    </>
  );
}

export default App;
