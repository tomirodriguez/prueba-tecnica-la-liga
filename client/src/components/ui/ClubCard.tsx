import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  ScaleFade,
  Spacer,
  Switch,
  Text,
} from '@chakra-ui/react';
import { FC, ChangeEvent } from 'react';
import { Club } from '../../model';

type Props = {
  club: Club;
  isTogglingFavorite: boolean;

  onFavoriteToggle: (clubId: string, favorite: boolean) => void;
};

export const ClubCard: FC<Props> = ({
  club,
  isTogglingFavorite,
  onFavoriteToggle,
}) => {
  const { avatar, foundationDate, name } = club;

  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFavoriteToggle(club.id, event.target.checked);
  };

  return (
    <ScaleFade initialScale={1} in whileHover={{ scale: 1.05 }}>
      <Box
        as="article"
        title={club.name}
        rounded="md"
        bg="bg.card"
        p="4"
        cursor={'pointer'}
        shadow={'md'}
      >
        <Flex gap={3}>
          <Image
            rounded={'md'}
            boxSize={{ base: '28', xl: '36' }}
            src={avatar}
            alt={`Escudo de ${name}`}
            flexShrink={0}
          />
          <Flex flexDir={'column'} flexGrow={1}>
            <Text fontSize={'lg'} as={'h2'} fontWeight="bold">
              {club.name}
            </Text>
            <Text fontSize="sm">
              Fundado el{' '}
              {foundationDate.toLocaleString('es', {
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
                onChange={handleSwitchChange}
                id={`favorite-${club.id}`}
                size="md"
                colorScheme={'blue'}
                isChecked={club.favorite}
                isDisabled={isTogglingFavorite}
                _focus={{
                  outline: 'none',
                  border: 'none',
                  boxShadow: 'none',
                }}
                _active={{
                  outline: 'none',
                  border: 'none',
                  boxShadow: 'none',
                }}
              />
            </FormControl>
          </Flex>
        </Flex>
      </Box>
    </ScaleFade>
  );
};
