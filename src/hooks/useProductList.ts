import { useEffect, useState } from 'react';

import { FETCH_SIZE } from '@/constants/productList';
import { Product } from '@/types/product.type';
import { getProductList } from '@/api/product';

const useProductList = () => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [order, setOrder] = useState<string>('asc');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const size =
          page === 0
            ? FETCH_SIZE.firstPageItemCount
            : FETCH_SIZE.moreLoadItemCount;
        const data = await getProductList({ page, size, category, order });
        setProducts((prev) => [...prev, ...data.content]);

        setHasNextPage(!data.last);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, category, order]);

  const resetProductState = () => {
    setProducts([]);
    setPage(0);
  };

  const fetchNextPage = () => {
    if (page === 0) {
      setPage(FETCH_SIZE.firstPageItemCount / FETCH_SIZE.moreLoadItemCount); // 20 / 4 = 5
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const handleChangeOrder = (newOrder: string) => {
    if (order === newOrder) return;
    setOrder(newOrder);
    resetProductState();
  };

  const handleChangeCategory = (newCategory: string) => {
    if (category === newCategory) return;
    setCategory(newCategory);
    resetProductState();
  };

  return {
    page,
    products,
    loading,
    error,
    fetchNextPage,
    hasNextPage,
    handleChangeOrder,
    handleChangeCategory,
  };
};

export default useProductList;
