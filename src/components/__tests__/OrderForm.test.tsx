import { render, screen, fireEvent } from '@testing-library/react';
import OrderForm from '@src/components/OrderForm';

jest.mock('react-hook-form', () => ({
  useFormContext: () => ({
    register: jest.fn(() => ({})),
    formState: { errors: {} },
    setValue: jest.fn(),
  }),
}));

jest.mock('@/contexts/AuthContext', () => ({
  useUserInfo: () => ({
    user: { name: '테스트 유저' },
    loading: false,
  }),
}));

describe('OrderForm', () => {
  const mockOpenModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('보내는 사람 입력창과 받는 사람이 없을 때 받는 사람 섹션이 렌더링되어야 한다', () => {
    render(<OrderForm onOpenRecipientModal={mockOpenModal} recipients={[]} />);

    expect(screen.getByText('보내는 사람')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('이름을 입력하세요.')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        '* 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.'
      )
    ).toBeInTheDocument();

    expect(screen.getByText('받는 사람')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '추가' })).toBeInTheDocument();

    const noRecipientText = screen.getByText(/받는 사람이 없습니다/);
    expect(noRecipientText).toBeInTheDocument();
  });

  it('받는 사람이 있을 때 받는 사람 목록과 버튼 텍스트가 "수정"으로 렌더링되어야 한다', () => {
    const recipientsMock = [
      {
        recipientName: '홍길동',
        recipientPhone: '01012345678',
        quantity: '1',
      },
    ];

    render(
      <OrderForm
        onOpenRecipientModal={mockOpenModal}
        recipients={recipientsMock}
      />
    );

    expect(screen.getByRole('button', { name: '수정' })).toBeInTheDocument();

    expect(screen.queryByText(/받는 사람이 없습니다/)).not.toBeInTheDocument();

    expect(screen.getByText('홍길동')).toBeInTheDocument();
  });

  it('받는 사람 추가/수정 버튼을 클릭하면 onOpenRecipientModal 함수가 호출되어야 한다', () => {
    render(<OrderForm onOpenRecipientModal={mockOpenModal} recipients={[]} />);

    fireEvent.click(screen.getByRole('button', { name: '추가' }));
    expect(mockOpenModal).toHaveBeenCalledTimes(1);
  });
});
