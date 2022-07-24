import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { PAGINATION_LIMIT } from '../../constants';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useClubsCatalogSelector } from '../../hooks/useClubsCatalogSelector';
import { clubsRequest } from '../../redux/slices/clubsCatalog';
import { PrimaryButton } from '../ui/PrimaryButton';

export const Pagination: FC = () => {
  const { total, offset, loading } = useClubsCatalogSelector();
  const dispatch = useAppDispatch();

  if (total === 0) return null;

  const handleNextPage = () => {
    dispatch(clubsRequest({ offset: offset + PAGINATION_LIMIT }));
  };

  const handlePreviousPage = () => {
    dispatch(clubsRequest({ offset: offset - PAGINATION_LIMIT }));
  };

  const hasPreviousPage = offset - PAGINATION_LIMIT >= 0;

  const hasNextPage = offset + PAGINATION_LIMIT < total;

  return (
    <Flex align={'center'}>
      <PrimaryButton
        onClick={handlePreviousPage}
        isDisabled={!hasPreviousPage}
        isLoading={loading}
      >
        Anterior
      </PrimaryButton>
      <Text mx="4">
        {Math.floor(offset / PAGINATION_LIMIT) + 1}/
        {Math.ceil(total / PAGINATION_LIMIT)}
      </Text>
      <PrimaryButton
        onClick={handleNextPage}
        isDisabled={!hasNextPage}
        isLoading={loading}
      >
        Siguiente
      </PrimaryButton>
    </Flex>
  );
};
