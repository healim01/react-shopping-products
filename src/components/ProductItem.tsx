import { FlexColumn, FlexRow, FlexSpaceBetween } from '@/style/common.style';

import CartInButton from './button/CartInButton';
import CartOutButton from './button/CartOutButton';
import { Product } from '@/types/product.type';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';
import { useEffect } from 'react';
import useErrorContext from '@/hooks/useErrorContext';
import useProductSelector from '@/hooks/useProductSelector';

interface Props {
  item: Product;
}

const ProductItem = ({ item }: Props) => {
  const { id, imageUrl, name, price } = item;
  const { isSelected, error, addCartItem, removeCartItem } =
    useProductSelector(id);
  const { setError } = useErrorContext();

  useEffect(() => {
    if (error) {
      setError(error as Error);
    }
  }, [error, setError]);

  return (
    <>
      <S.ItemCard>
        <S.Img src={imageUrl} />
        <S.InfoWrapper>
          <S.InfoText>
            <S.Title>{name}</S.Title>
            <S.Price>{price.toLocaleString('ko-KR')}</S.Price>
          </S.InfoText>
          <S.ButtonWrapper>
            {isSelected ? (
              <CartOutButton onClick={removeCartItem} />
            ) : (
              <CartInButton onClick={addCartItem} />
            )}
          </S.ButtonWrapper>
        </S.InfoWrapper>
      </S.ItemCard>
    </>
  );
};

export default ProductItem;

const S = {
  ItemCard: styled.div`
    ${FlexColumn}
    width: 175px;
    height: 225px;
    border-radius: 8px;
    box-shadow: 0 0 10px 0 ${theme.color.blackWithOpacity};
    border-radius: 8px;
  `,
  Img: styled.img`
    width: 175px;
    height: 110px;
    border-radius: 8px 8px 0 0;
    object-fit: cover;
  `,

  InfoWrapper: styled.div`
    ${FlexColumn}
    ${FlexSpaceBetween}
    height: calc(225px - 110px);
    margin-top: 7px;
    padding: 8px;
  `,
  InfoText: styled.div`
    ${FlexColumn}
    ${FlexSpaceBetween}
    height: 40px;
  `,
  Title: styled.div`
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.bold};
  `,
  Price: styled.div`
    font-size: ${theme.fontSize.xsmall};
  `,
  ButtonWrapper: styled.div`
    ${FlexRow}
    justify-content: flex-end;
  `,
};
