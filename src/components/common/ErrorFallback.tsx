import { css } from '@emotion/react';
import errorImg from '@src/assets/icons/img_not_found.png';

const errorFallbackStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 250px;
  width: 100%;
  font-size: 1.25rem;
  flex-direction: column;
`;
const imgStyle = css`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;
const ErrorFallback = () => (
  <div css={errorFallbackStyle}>
    <img css={imgStyle} src={errorImg} alt="에러 이미지" />
    <br />
    <p>로딩 중 에러가 발생했습니다</p>
  </div>
);

export default ErrorFallback;
