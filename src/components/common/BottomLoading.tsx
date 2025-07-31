import { css } from '@emotion/react';
import loadingGif from '@src/assets/icons/loading.gif';

const bottomLoading = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
`;

const loadingGifStyle = css`
  width: 50px;
`;

interface BottomLoadingProps {
  innerRef?: (node?: Element | null) => void;
}

const BottomLoading = ({ innerRef }: BottomLoadingProps) => (
  <div css={bottomLoading} ref={innerRef}>
    <img
      css={loadingGifStyle}
      src={loadingGif}
      alt="상품을 불러오는 중입니다..."
    />
  </div>
);

export default BottomLoading;
