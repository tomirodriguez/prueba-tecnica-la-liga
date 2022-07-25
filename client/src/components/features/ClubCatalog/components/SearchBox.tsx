import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FC, SyntheticEvent, useRef } from 'react';
import { useNameFilter } from '../../../../hooks';
import { useClubsCatalogSelector } from '../../../../redux';

export const SearchBox: FC = () => {
  const applyFilter = useNameFilter();
  const { total, loading } = useClubsCatalogSelector();
  const inputRef = useRef<HTMLInputElement>(null);
  const { colorMode } = useColorMode();

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!inputRef.current) return;

    const nameFilter = inputRef.current.value;

    applyFilter(nameFilter);
  };

  return (
    <Box title="Search club by name" role={'search'}>
      <form onSubmit={handleFormSubmit}>
        <InputGroup bg={'white'} rounded="lg" borderColor={'transparent'}>
          <InputLeftAddon
            bg={`${colorMode}.secondary.light`}
            color="white"
            children={<SearchIcon />}
          />
          <Input
            role={'searchbox'}
            title="Search box"
            type="text"
            backgroundColor={`${colorMode}.bg.card`}
            placeholder="Qué club desea buscar"
            ref={inputRef}
            _focus={{
              outline: 'none',
              borderColor: `${colorMode}.secondary.main`,
            }}
            _hover={{
              outline: 'none',
              borderColor: `${colorMode}.secondary.main`,
            }}
          />
        </InputGroup>
      </form>
      <Box mt={2} h="6" fontSize="sm" title="Search results">
        {!loading && (
          <>
            {total === 0 && <Text>No se encontraron clubes.</Text>}
            {total === 1 && <Text>Se encontró 1 club.</Text>}
            {total > 1 && <Text>Se encontraron {total} clubes.</Text>}
          </>
        )}
      </Box>
    </Box>
  );
};
