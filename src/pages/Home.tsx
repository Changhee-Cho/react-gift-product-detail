import { Suspense } from 'react';
import Banner from '@src/components/Banner';
import Maintheme from '@src/components/Maintheme';
import AdBoard from '@src/components/AdBoard';
import Realtime from '@src/components/Realtime';

import ErrorBoundary from '@src/components/common/ErrorBoundary';
import ErrorFallback from '@src/components/common/ErrorFallback';
import Loading from '@src/components/common/Loading';

const Home = () => {
  return (
    <>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loading />}>
          <Banner />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loading />}>
          <Maintheme />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loading />}>
          <AdBoard />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<Loading />}>
          <Realtime />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Home;
