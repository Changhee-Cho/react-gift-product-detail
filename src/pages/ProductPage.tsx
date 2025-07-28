import ProductThumbnail from '@src/components/ProductThumbnail';
import ProductDetailTabs from '@/components/ProductDetail';
import FixedButtons from '@/components/fixedButtonOnProductPage';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '@/hooks/useProduct';
import { useEffect, useState } from 'react';
import { getOrderDetailPath } from '@/constants/routes';
import { css } from '@emotion/react';

const divCover = css`
  width: 100%;
`;
const spacer64 = css`
  height: 64px;
  background-color: transparent;
`;
const lineDiv8px = css`
  height: 8px;
  background-color: rgb(243, 244, 245);
`;
const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const id = productId ? Number(productId) : 0;
  const { info, detail, review, wish } = useProduct(id);
  const [hearted, setHearted] = useState(false);
  const [wishCount, setWishCount] = useState(0);

  useEffect(() => {
    if (wish) {
      setHearted(wish.isWished ?? false);
      setWishCount(wish.wishCount ?? 0);
    }
  }, [wish]);

  const navigate = useNavigate();

  const goOrder = () => {
    navigate(getOrderDetailPath(id));
  };
  const handleHeartClick = () => {
    if (!hearted) {
      setHearted(true);
      setWishCount((prev) => prev + 1);
    } else {
      setHearted(false);
      setWishCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  return (
    <div css={divCover}>
      <ProductThumbnail info={info} />
      <div css={lineDiv8px} />
      <ProductDetailTabs info={info} review={review} detail={detail} />
      <div css={spacer64} />
      <FixedButtons
        hearted={hearted}
        wishCount={wishCount}
        onHeartClick={handleHeartClick}
        onOrderClick={goOrder}
      />
    </div>
  );
};

export default ProductPage;
