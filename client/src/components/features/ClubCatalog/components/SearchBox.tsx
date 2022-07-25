import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FC, SyntheticEvent, useRef, useState, ChangeEvent } from 'react';
import { useNameFilter } from '../../../../hooks';
import { useClubsCatalogSelector } from '../../../../redux';

export const SearchBox: FC = () => {
  const applyFilter = useNameFilter();
  const { total, loading, nameFilter } = useClubsCatalogSelector();
  const inputRef = useRef<HTMLInputElement>(null);
  const { colorMode } = useColorMode();
  const [newNameFilter, setNewNameFilter] = useState('');

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    applyFilter(newNameFilter);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNameFilter(event.target.value);
  };

  const clearSearch = () => {
    if (nameFilter) {
      applyFilter('');
      setNewNameFilter('');
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <Box title="Search club by name" role={'search'}>
      <form onSubmit={handleFormSubmit}>
        <InputGroup bg={'white'} rounded="lg" borderColor={'transparent'}>
          <InputLeftAddon
            cursor={'pointer'}
            onClick={focusInput}
            bg={`${colorMode}.secondary.main`}
            color="white"
            children={<SearchIcon />}
            _hover={{ bg: `${colorMode}.secondary.dark` }}
          />
          <Input
            role={'searchbox'}
            title="Search box"
            type="text"
            backgroundColor={`${colorMode}.bg.card`}
            placeholder="Qué club desea buscar"
            ref={inputRef}
            value={newNameFilter}
            onChange={handleInputChange}
            _focus={{
              outline: 'none',
              borderColor: `${colorMode}.secondary.dark`,
            }}
            _hover={{
              outline: 'none',
              borderColor: `${colorMode}.secondary.dark`,
            }}
          />
          <InputRightAddon
            cursor={'pointer'}
            onClick={clearSearch}
            bg={`gray`}
            color="white"
            children={<CloseIcon />}
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
