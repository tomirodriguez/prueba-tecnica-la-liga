import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Spacer,
  Switch,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Club } from '../../model';

type Props = {
  club: Club;
};

export const ClubCard: FC<Props> = ({ club }) => {
  const { avatar, foundationDate, name } = club;

  return (
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
        <Image
          rounded={'md'}
          boxSize="28"
          src={avatar}
          alt={name}
          flexShrink={0}
        />
        <Flex flexDir={'column'} flexGrow={1}>
          <Text fontSize={'lg'} as={'h2'}>
            {club.name}
          </Text>
          <Text fontSize="sm">
            Fundado el{' '}
            {new Date(foundationDate).toLocaleString('es', {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric',
            })}
          </Text>
          <Spacer />
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
          </FormControl>
        </Flex>
      </Flex>
    </Box>
  );
};
