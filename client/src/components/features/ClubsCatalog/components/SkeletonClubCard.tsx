import { Box, Flex, Progress } from '@chakra-ui/react';

export const SkeletonClubCard = () => (
  <Box
    position={'relative'}
    shadow={'md'}
    rounded="md"
    bg="white"
    p="4"
    cursor={'pointer'}
    _hover={{ shadow: 'xl' }}
  >
    <Flex gap={3}>
      <Progress colorScheme="gray" isIndeterminate rounded="5" boxSize={28} />

      <Flex flexDir={'column'} flexGrow={1}>
        <Progress
          mb="2"
          colorScheme="gray"
          isIndeterminate
          h={'6'}
          rounded="5"
        />
        <Progress colorScheme="gray" isIndeterminate h={'4'} rounded="5" />

        {/* <Spacer />
        <FormControl as={Flex} alignItems="center" justifyContent={'end'}>
          <FormLabel m={0} mr={2} htmlFor={`favorite-${club.id}`}>
            Favorito
          </FormLabel>
          <Switch
            id={`favorite-${club.id}`}
            size="md"
            colorScheme={'blue'}
            _focus={{ outline: 'none', border: 'none', boxShadow: 'none' }}
            _active={{ outline: 'none', border: 'none', boxShadow: 'none' }}
          />
        </FormControl> */}
      </Flex>
    </Flex>
  </Box>
);
