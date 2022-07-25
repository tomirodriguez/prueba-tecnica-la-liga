import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react';
import { FC, SyntheticEvent, useRef } from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useClubsCatalogSelector } from '../../../../hooks/useClubsCatalogSelector';
import {
  clubsRequest,
  applyNameFilter,
} from '../../../../redux/slices/clubsCatalog';

export const SearchBox: FC = () => {
  const dispatch = useAppDispatch();
  const { total } = useClubsCatalogSelector();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!inputRef.current) return;

    const nameFilter = inputRef.current.value;

    dispatch(applyNameFilter({ nameFilter }));
    dispatch(clubsRequest());
  };

  return (
    <Box title="Search club by name" role={'searchbox'}>
      <form onSubmit={handleFormSubmit}>
        <InputGroup bg={'white'} rounded="md">
          <InputLeftAddon
            bg="secondary.light"
            color="white"
            children={<SearchIcon />}
          />
          <Input
            type="text"
            placeholder="Qué club desea buscar"
            ref={inputRef}
          />
        </InputGroup>
      </form>
      <Box mt={2} fontSize="sm" title="Search results">
        {total === 0 && <Text>No se encontraron clubes.</Text>}
        {total === 1 && <Text>Se encontro 1 club.</Text>}
        {total > 1 && <Text>Se encontraron {total} clubes.</Text>}
      </Box>
    </Box>
  );
};
