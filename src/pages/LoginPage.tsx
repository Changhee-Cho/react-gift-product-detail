import ErrorBoundary from '@/components/common/ErrorBoundary';
import ErrorFallback from '@/components/common/ErrorFallback';
import Login from '@src/components/Login';

const LoginPage = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Login />
    </ErrorBoundary>
  );
};

export default LoginPage;
