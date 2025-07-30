import { css } from '@emotion/react';
import Logout from '@/components/Logout';
import MyInfo from '@/components/MyInfo';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ErrorFallback from '@/components/common/ErrorFallback';

const divStyle = css`
  padding: 0px 1rem;
`;

const MyPage = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div css={divStyle}>
        <MyInfo />
        <Logout />
      </div>
    </ErrorBoundary>
  );
};

export default MyPage;
