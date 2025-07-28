import { css } from '@emotion/react';

const sectionThumbnail = css`
  width: 100%;
`;
const thumbnailImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: rgb(243, 244, 245);
`;
const thumbnailInfoDiv = css`
  width: 100%;
  padding: 0px 1rem;
  box-sizing: border-box;
`;
const thumbnailInfoTitle = css`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6875rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;
const thumbnailPriceP = css`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.6875rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;
const thumbnailBrandDiv = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0px 1rem;
  box-sizing: border-box;
`;
const thumbnailBrandImg = css`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;
const thumbnailBrandName = css`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;
const spacer20 = css`
  height: 20px;
  background-color: transparent;
`;
const spacer8 = css`
  height: 8px;
  background-color: transparent;
`;
const spacer16 = css`
  height: 16px;
  background-color: transparent;
`;
const lineDiv1px = css`
  height: 1px;
  background-color: rgb(238, 239, 241);
`;

type BrandInfo = {
  imageURL?: string;
  name?: string;
};

type Info = {
  imageURL?: string;
  name?: string;
  price: {
    sellingPrice: number;
  };
  brandInfo: BrandInfo;
};

type Props = {
  info?: Info;
};

const ProductThumbnail = ({ info }: Props) => (
  <section css={sectionThumbnail}>
    <img css={thumbnailImg} src={info?.imageURL} alt={info?.name} />
    <div css={spacer20} />
    <div css={thumbnailInfoDiv}>
      <h3 css={thumbnailInfoTitle}>{info?.name}</h3>
      <div css={spacer8} />
      <p css={thumbnailPriceP}>
        {info?.price.sellingPrice.toLocaleString()}
        <span style={{ fontWeight: 400 }}>원</span>
      </p>
    </div>
    <div css={spacer16} />
    <div css={lineDiv1px} />
    <div css={spacer16} />
    <div css={thumbnailBrandDiv}>
      <img
        css={thumbnailBrandImg}
        src={info?.brandInfo.imageURL}
        alt={info?.brandInfo.name}
      />
      <p css={thumbnailBrandName}>{info?.brandInfo.name}</p>
    </div>
    <div css={spacer16} />
  </section>
);

export default ProductThumbnail;
