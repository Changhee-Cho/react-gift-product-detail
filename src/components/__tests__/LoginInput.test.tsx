import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@src/components/Login';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import tokens from '@src/styles/tokens/index';

vi.mock('@/contexts/AuthContext', () => ({
  useUserInfo: () => ({ setUser: vi.fn() }),
}));

vi.mock('@/hooks/useLoginMutation', () => ({
  __esModule: true,
  default: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

describe('Login 페이지 - ID, PW 유효성 검사 및 버튼 활성화', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  const idInput = () => screen.getByPlaceholderText('이메일');
  const pwInput = () => screen.getByPlaceholderText('비밀번호');
  const loginButton = () => screen.getByRole('button', { name: /로그인/i });

  it('초기 상태에서 버튼은 비활성화, 에러 메시지는 없다', () => {
    expect(idInput()).toBeInTheDocument();
    expect(pwInput()).toBeInTheDocument();
    expect(loginButton()).toBeDisabled();

    expect(screen.queryByText(/ID를 입력해주세요/)).not.toBeInTheDocument();
    expect(screen.queryByText(/이메일 형식/)).not.toBeInTheDocument();
    expect(screen.queryByText(/PW를 입력해주세요/)).not.toBeInTheDocument();
    expect(screen.queryByText(/최소 8글자/)).not.toBeInTheDocument();
  });

  it('잘못된 이메일 형식 입력 후 blur 시 "ID는 이메일 형식으로 입력해주세요." 에러 메시지와 빨간색 표시', async () => {
    userEvent.clear(idInput());
    await userEvent.type(idInput(), 'not-an-email');
    userEvent.tab();

    const error = await screen.findByText('ID는 이메일 형식으로 입력해주세요.');
    expect(error).toBeVisible();
    expect(error).toHaveStyle(`color: ${tokens.colors.red700}`);
    expect(loginButton()).toBeDisabled();
  });

  it('올바른 이메일 입력 시 에러 메시지가 사라진다', async () => {
    userEvent.clear(idInput());
    await userEvent.type(idInput(), 'test@example.com');
    userEvent.tab();

    await waitFor(() => {
      expect(screen.queryByText('ID를 입력해주세요.')).not.toBeInTheDocument();
      expect(
        screen.queryByText('ID는 이메일 형식으로 입력해주세요.')
      ).not.toBeInTheDocument();
    });
  });

  it('8글자 미만 PW 입력 후 blur 시 "PW는 최소 8글자 이상이어야 합니다." 에러 메시지와 빨간색 표시', async () => {
    userEvent.clear(pwInput());
    await userEvent.type(pwInput(), 'short');
    userEvent.tab();

    const error = await screen.findByText('PW는 최소 8글자 이상이어야 합니다.');
    expect(error).toBeVisible();
    expect(error).toHaveStyle(`color: ${tokens.colors.red700}`);
    expect(loginButton()).toBeDisabled();
  });

  it('ID와 PW 모두 올바르면 로그인 버튼이 활성화 된다', async () => {
    await userEvent.type(idInput(), 'test@example.com');
    await userEvent.type(pwInput(), 'validpassword');

    userEvent.tab();

    await waitFor(() => {
      expect(loginButton()).toBeEnabled();
      expect(screen.queryByText(/ID를 입력해주세요./)).not.toBeInTheDocument();
      expect(screen.queryByText(/PW를 입력해주세요./)).not.toBeInTheDocument();
    });
  });

  it('ID 또는 PW가 유효하지 않으면 로그인 버튼은 비활성화 상태 유지', async () => {
    await userEvent.type(idInput(), 'invalid-email');
    await userEvent.type(pwInput(), 'validpassword');
    userEvent.tab();

    await waitFor(() => {
      expect(loginButton()).toBeDisabled();
    });

    userEvent.clear(idInput());
    userEvent.clear(pwInput());

    await userEvent.type(idInput(), 'test@example.com');
    await userEvent.type(pwInput(), 'short');
    userEvent.tab();

    await waitFor(() => {
      expect(loginButton()).toBeDisabled();
    });
  });
});
