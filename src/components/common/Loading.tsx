import { css } from '@emotion/react';
import loadingGif from '@src/assets/icons/loading.gif';

const loadingStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  height: 320px;
  padding: 8px;
`;

const loadingGifStyle = css`
  width: 50px;
`;

const Loading = () => {
  return (
    <div css={loadingStyle}>
      <img css={loadingGifStyle} src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default Loading;
