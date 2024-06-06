import { QUERY_KEYS } from '@/constants/queryKeys';
import { getCartList } from '@/api/cartItem';
import { useSuspenseQuery } from '@tanstack/react-query';

const useGetCartListQuery = () => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: getCartList,
  });
};

export default useGetCartListQuery;
