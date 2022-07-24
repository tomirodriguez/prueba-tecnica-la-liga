import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { FC, SyntheticEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  clubsRequest,
  updateNameFilter,
} from '../../store/slices/clubsCatalog';

export const SearchBox: FC = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!inputRef.current) return;

    const nameFilter = inputRef.current.value;

    dispatch(updateNameFilter({ nameFilter }));
    dispatch(clubsRequest());
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <InputGroup bg={'white'} rounded="md">
        <InputLeftAddon
          bg="secondary.light"
          color="white"
          children={<SearchIcon />}
        />
        <Input type="text" placeholder="Qué club desea buscar" ref={inputRef} />
      </InputGroup>
    </form>
  );
};
