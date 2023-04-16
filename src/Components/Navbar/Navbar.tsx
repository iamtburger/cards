import React from 'react';
import { Box, Flex, HStack, Button, Image } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function Navbar({ onOpen }: { onOpen: () => void }) {
  return (
    <>
      <Box bg={'gray.900'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image src="logo.png" boxSize="150px" />
            </Box>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              color={'white'}
              backgroundColor={'red.600'}
              mr={4}
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              New pack
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
