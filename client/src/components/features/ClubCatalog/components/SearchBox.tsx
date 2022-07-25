import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import { FC, SyntheticEvent, useRef } from 'react';
import { useNameFilter } from '../../../../hooks';
import { useClubsCatalogSelector } from '../../../../redux';

export const SearchBox: FC = () => {
  const applyFilter = useNameFilter();
  const { total } = useClubsCatalogSelector();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!inputRef.current) return;

    const nameFilter = inputRef.current.value;

    applyFilter(nameFilter);
  };

  return (
    <Box title="Search club by name" role={'search'}>
      <form onSubmit={handleFormSubmit}>
        <InputGroup bg={'white'} rounded="md">
          <InputLeftAddon
            bg="secondary.light"
            color="white"
            children={<SearchIcon />}
          />
          <Input
            role={'searchbox'}
            title="Search box"
            type="text"
            placeholder="Qué club desea buscar"
            ref={inputRef}
            _focus={{ outline: 'none', borderColor: 'secondary.main' }}
          />
        </InputGroup>
      </form>
      <Box mt={2} fontSize="sm" title="Search results">
        {total === 0 && <Text>No se encontraron clubes.</Text>}
        {total === 1 && <Text>Se encontró 1 club.</Text>}
        {total > 1 && <Text>Se encontraron {total} clubes.</Text>}
      </Box>
    </Box>
  );
};
