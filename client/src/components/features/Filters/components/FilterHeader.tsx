import { ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  isShowingFilters: boolean;
  onClick: () => void;
};

export const FilterHeader: FC<Props> = ({ onClick, isShowingFilters }) => {
  return (
    <Flex
      justify="space-between"
      align="center"
      onClick={onClick}
      verticalAlign="center"
      cursor={'pointer'}
    >
      <Text fontWeight={'bold'}>Filtros</Text>
      <Flex
        fontSize={25}
        align="center"
        transform={isShowingFilters ? '' : 'rotateX(180deg)'}
        transition={'all 0.5s ease-out'}
      >
        <ChevronUpIcon />
      </Flex>
    </Flex>
  );
};
