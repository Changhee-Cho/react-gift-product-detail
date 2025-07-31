import { css } from '@emotion/react';
import loadingGif from '@src/assets/icons/loading.gif';

const loadingStyle = css`
  width: 100%;
  height: calc(100vh - 2.75rem);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const loadingGifStyle = css`
  width: 50px;
`;
const PageLoading = () => (
  <div css={loadingStyle}>
    <img css={loadingGifStyle} src={loadingGif} alt="Loading..." />
  </div>
);

export default PageLoading;
