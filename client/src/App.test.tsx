import React from 'react';
import { render } from '@testing-library/react';

// 간단한 컴포넌트 테스트
test('renders without crashing', () => {
  const { getByText } = render(
    <div>
      <h1>트립챗 테스트</h1>
    </div>
  );
  
  expect(getByText('트립챗 테스트')).toBeInTheDocument();
});

// 기본 수학 연산 테스트
test('basic math operations', () => {
  expect(2 + 2).toBe(4);
  expect(5 * 3).toBe(15);
  expect(10 / 2).toBe(5);
});
