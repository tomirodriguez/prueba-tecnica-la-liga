import { Flex, Link, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { PAGINATION_LIMIT } from '../../../../constants';
import { useCatalog } from '../../../../hooks';
import { useClubsCatalogSelector } from '../../../../redux';
import { PrimaryButton } from '../../../ui';

export const Pagination: FC = () => {
  const { total, offset, loading } = useClubsCatalogSelector();
  const updateCatalog = useCatalog();

  if (total === 0) return null;

  const handleNextPage = () => {
    updateCatalog({ offset: offset + PAGINATION_LIMIT });
  };

  const handlePreviousPage = () => {
    updateCatalog({ offset: offset - PAGINATION_LIMIT });
  };

  const hasPreviousPage = offset - PAGINATION_LIMIT >= 0;

  const hasNextPage = offset + PAGINATION_LIMIT < total;

  if (!hasNextPage && !hasPreviousPage) return null;

  return (
    <Flex align={'center'} as="nav" aria-label="Pagination">
      {/* 
        Estoy sobreescribiendo con style ya que textDecoration/textDecor no funciona correctamente
      */}
      <Link href="#catalog" style={{ textDecoration: 'none' }}>
        <PrimaryButton
          aria-label="Previous page"
          onClick={handlePreviousPage}
          isDisabled={!hasPreviousPage}
          isLoading={loading}
        >
          Anterior
        </PrimaryButton>
      </Link>
      <Text mx="4" aria-label="Page count" role="contentinfo">
        {Math.floor(offset / PAGINATION_LIMIT) + 1}/
        {Math.ceil(total / PAGINATION_LIMIT)}
      </Text>
      <Link href="#catalog" style={{ textDecoration: 'none' }}>
        <PrimaryButton
          aria-label="Next page"
          onClick={handleNextPage}
          isDisabled={!hasNextPage}
          isLoading={loading}
        >
          Siguiente
        </PrimaryButton>
      </Link>
    </Flex>
  );
};
