import assert from 'node:assert/strict';
import { test } from 'node:test';
import { totalExperienceText } from './useCareerCalculator.ts';

test('시작 달과 끝 달을 모두 포함한다', () => {
  assert.equal(totalExperienceText([{ from: '2021.07', to: '2021.12' }]), '0.5y');
  assert.equal(totalExperienceText([{ from: '2022.01', to: '2022.12' }]), '1y');
});

test('여러 경력을 더한다', () => {
  assert.equal(
    totalExperienceText([
      { from: '2021.07', to: '2021.12' },
      { from: '2022.01', to: '2025.04' },
    ]),
    '3.8y',
  );
});

test('진행 중인 경력은 기준 날짜의 달까지 센다', () => {
  assert.equal(totalExperienceText([{ from: '2025.01', to: 'Present' }], new Date(2025, 5, 15)), '0.5y');
});
