import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { PAGINATION_LIMIT } from '../../../../constants';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useClubsCatalogSelector } from '../../../../hooks/useClubsCatalogSelector';
import { clubsRequest } from '../../../../redux/slices/clubsCatalog';
import { PrimaryButton } from '../../../ui/PrimaryButton';

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

  if (!hasNextPage && !hasPreviousPage) return null;

  return (
    <Flex align={'center'} as="nav" aria-label="Pagination">
      <PrimaryButton
        aria-label="Previous page"
        onClick={handlePreviousPage}
        isDisabled={!hasPreviousPage}
        isLoading={loading}
      >
        Anterior
      </PrimaryButton>
      <Text mx="4" aria-label="Page count" role="contentinfo">
        {Math.floor(offset / PAGINATION_LIMIT) + 1}/
        {Math.ceil(total / PAGINATION_LIMIT)}
      </Text>
      <PrimaryButton
        aria-label="Next page"
        onClick={handleNextPage}
        isDisabled={!hasNextPage}
        isLoading={loading}
      >
        Siguiente
      </PrimaryButton>
    </Flex>
  );
};
