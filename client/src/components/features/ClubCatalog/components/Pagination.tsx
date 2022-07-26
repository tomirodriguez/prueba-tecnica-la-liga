import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Link, Text, useColorMode } from '@chakra-ui/react';
import { FC } from 'react';
import { PAGINATION_LIMIT } from '../../../../constants';
import { useCatalog } from '../../../../hooks';
import { useClubsCatalogSelector } from '../../../../redux';

export const Pagination: FC = () => {
  const { total, offset, loading } = useClubsCatalogSelector();
  const updateCatalog = useCatalog();
  const { colorMode } = useColorMode();

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
        <Button
          bg={'transparent'}
          aria-label="Previous page"
          onClick={handlePreviousPage}
          isDisabled={!hasPreviousPage}
          isLoading={loading}
          color={`${colorMode}.secondary.main`}
        >
          <ChevronLeftIcon boxSize={8} />
        </Button>
      </Link>
      <Text mx="4" aria-label="Page count" role="contentinfo">
        {Math.floor(offset / PAGINATION_LIMIT) + 1}/
        {Math.ceil(total / PAGINATION_LIMIT)}
      </Text>
      <Link href="#catalog" style={{ textDecoration: 'none' }}>
        <Button
          aria-label="Next page"
          bg={'transparent'}
          onClick={handleNextPage}
          isDisabled={!hasNextPage}
          isLoading={loading}
          color={`${colorMode}.secondary.main`}
        >
          <ChevronRightIcon boxSize={8} />
        </Button>
      </Link>
    </Flex>
  );
};
