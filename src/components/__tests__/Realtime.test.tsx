/*
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { server } from '@src/mocks/server';
import { http, HttpResponse } from 'msw';
import Realtime from '@/components/Realtime';

describe('Realtime 선물랭킹 컴포넌트', () => {
  test('초기 로딩 시 "로딩" 문구가 보이고, 이후 데이터가 렌더링됨', async () => {
    render(<Realtime />);

    expect(screen.getByText(/로딩/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/테스트 상품/i)).toBeInTheDocument();
    });
  });

  test('API 에러 발생 시 에러 메시지 렌더링', async () => {
    server.use(
      http.get('/api/products/ranking', () => {
        return HttpResponse.json(
          { message: '잘못된 targetType 또는 rankType입니다.' },
          { status: 400 }
        );
      })
    );

    render(<Realtime />);

    await waitFor(() => {
      expect(screen.getByText(/상품이 없습니다/i)).toBeInTheDocument();
    });
  });

  test('타겟 버튼 클릭 시 쿼리 파라미터 반영 및 UI 변경 확인', async () => {
    render(<Realtime />);

    await waitFor(() => {
      expect(screen.getByText(/테스트 상품/i)).toBeInTheDocument();
    });

    const femaleButton = screen.getByRole('button', { name: /여성이/i });
    fireEvent.click(femaleButton);

    expect(femaleButton).toHaveStyle('font-weight: 700');

    await waitFor(() => {
      expect(screen.getByText(/테스트 상품/i)).toBeInTheDocument();
    });
  });
});
