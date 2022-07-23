import { InputGroup, InputLeftAddon, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FC, SyntheticEvent, useRef } from 'react';

type Props = {
  onSearch: (searchValue: string) => void;
};

export const SearchBox: FC<Props> = ({ onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (event: SyntheticEvent) => {
    if (!inputRef.current) return;

    event.preventDefault();
    onSearch(inputRef.current?.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <InputGroup bg={'white'} rounded="md">
        <InputLeftAddon children={<SearchIcon />} />
        <Input type="text" placeholder="Qué club desea buscar" ref={inputRef} />
      </InputGroup>
    </form>
  );
};
