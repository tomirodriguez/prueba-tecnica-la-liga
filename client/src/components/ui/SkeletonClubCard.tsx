import { Box, Flex, Progress } from '@chakra-ui/react';

export const SkeletonClubCard = () => (
  <Box
    position={'relative'}
    shadow={'md'}
    rounded="md"
    bg="white"
    p="4"
    cursor={'pointer'}
  >
    <Flex gap={3}>
      <Progress
        colorScheme="gray"
        isIndeterminate
        rounded="5"
        boxSize={{ base: '28', xl: '36' }}
      />

      <Flex flexDir={'column'} flexGrow={1}>
        <Progress
          mb="2"
          colorScheme="gray"
          isIndeterminate
          h={'6'}
          rounded="5"
        />
        <Progress colorScheme="gray" isIndeterminate h={'4'} rounded="5" />
      </Flex>
    </Flex>
  </Box>
);
