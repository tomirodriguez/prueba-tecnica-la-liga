import { Button, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { PAGINATION_LIMIT } from '../../constants';
import { useClubsCatalogSelector } from '../../hooks/useClubsCatalogSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clubsRequest } from '../../store/slices/clubsCatalog';

export const Pagination: FC = () => {
  const { total, offset } = useClubsCatalogSelector();
  const dispatch = useAppDispatch();

  const handleNextPage = () => {
    dispatch(clubsRequest({ offset: offset + PAGINATION_LIMIT }));
  };

  const handlePreviousPage = () => {
    dispatch(clubsRequest({ offset: offset - PAGINATION_LIMIT }));
  };

  const hasPreviousPage = offset - PAGINATION_LIMIT > 0;

  const hasNextPage = offset + PAGINATION_LIMIT < total;

  return (
    <Flex align={'center'}>
      <Button onClick={handlePreviousPage} isDisabled={!hasPreviousPage}>
        Anterior
      </Button>
      <Text mx="4">
        {Math.floor(offset / PAGINATION_LIMIT) + 1}/
        {Math.ceil(total / PAGINATION_LIMIT)}
      </Text>
      <Button onClick={handleNextPage} isDisabled={!hasNextPage}>
        Siguiente
      </Button>
    </Flex>
  );
};
