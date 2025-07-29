import { css } from '@emotion/react';
import { useAuthNavigation } from '@/hooks/useAuthNavigation';
import theme from '@src/styles/tokens/index';

const EXPANDED_DISPLAY_COUNT = 21;
const DEFAULT_DISPLAY_COUNT = 6;
const TOP_RANK_COUNT = 3;

const rankingGrid = css`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px 8px;
`;
const rankingItemBox = css`
  width: 100%;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;
const rankingNumberWins = css`
  position: absolute;
  z-index: ${theme.zIndex.itemRankingBadge};
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.typography.label2Bold.fontSize};
  font-weight: ${theme.typography.label2Bold.fontWeight};
  top: 0.25rem;
  left: 0.25rem;
  color: ${theme.colors.gray00};
  background-color: ${theme.colors.red600};
`;
const rankingNumber = css`
  position: absolute;
  z-index: ${theme.zIndex.itemRankingBadge};
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.typography.label2Bold.fontSize};
  font-weight: ${theme.typography.label2Bold.fontWeight};
  top: 0.25rem;
  left: 0.25rem;
  color: #fff;
  background-color: ${theme.colors.textSub};
`;
const rankingItemInfo = css`
  width: 100%;
`;
const rankingItemImg = css`
  width: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: 4px;
  overflow: hidden;
`;
const rankingItemBrand = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${theme.typography.subtitle2Regular.fontSize};
  font-weight: ${theme.typography.subtitle2Regular.fontWeight};
  line-height: ${theme.typography.subtitle2Regular.lineHeight};
  color: ${theme.colors.textSub};
  margin: 0px;
  text-align: left;
`;
const rankingItemName = css`
  font-size: ${theme.typography.subtitle2Regular.fontSize};
  font-weight: ${theme.typography.subtitle2Regular.fontWeight};
  line-height: ${theme.typography.subtitle2Regular.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
`;
const rankingItemPrice = css`
  font-size: ${theme.typography.title2Bold.fontSize};
  font-weight: ${theme.typography.title2Bold.fontWeight};
  line-height: ${theme.typography.title2Bold.lineHeight};
  color: ${theme.colors.textDefault};
  margin: 0px;
  text-align: left;
  word-break: break-word;
`;
const spacer12 = css`
  height: ${theme.spacing.spacing3};
`;
const spacer4 = css`
  height: ${theme.spacing.spacing1};
`;

type Product = {
  id: number;
  imageURL: string;
  name: string;
  brandInfo: { name: string };
  price: { sellingPrice: number };
};

type Props = {
  products: Product[];
  expanded: boolean;
};

const ProductRankingList = ({ products, expanded }: Props) => {
  const { navigateIfLoggedIn } = useAuthNavigation();

  const displayedCount = expanded
    ? EXPANDED_DISPLAY_COUNT
    : DEFAULT_DISPLAY_COUNT;

  const goItem = (id: number) => {
    navigateIfLoggedIn(`/product/${id}`);
  };

  return (
    <div css={rankingGrid}>
      {products.slice(0, displayedCount).map((product, i) => {
        const rank = i + 1;
        return (
          <div
            css={rankingItemBox}
            key={product.id}
            onClick={() => goItem(product.id)}
          >
            <span
              css={rank <= TOP_RANK_COUNT ? rankingNumberWins : rankingNumber}
            >
              {rank}
            </span>
            <div css={rankingItemInfo}>
              <img
                css={rankingItemImg}
                src={product.imageURL}
                alt={product.name}
              />
              <div css={spacer12} />
              <p css={rankingItemBrand}>{product.brandInfo.name}</p>
              <h6 css={rankingItemName}>{product.name}</h6>
              <div css={spacer4} />
              <p css={rankingItemPrice}>
                {product.price.sellingPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductRankingList;
