import { useMemo } from 'react';

interface Experience {
  from: string;
  to?: string;
}

// '2021.07' 을 로컬 시간 기준 그 달로 읽는다. new Date('2021-07') 은 UTC 라 서쪽 시간대에서 전달이 된다.
const parseMonth = (dateStr: string) => {
  const [year, month] = dateStr.split('.').map(Number);
  return { year, month: month - 1 };
};

// 시작 달과 끝 달을 모두 포함해 센다. 2021.07 ~ 2021.12 는 6개월이다.
export const totalExperienceText = (experiences: Experience[], now = new Date()): string => {
  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = parseMonth(exp.from);
    const end =
      !exp.to || exp.to.toLowerCase() === 'present'
        ? { year: now.getFullYear(), month: now.getMonth() }
        : parseMonth(exp.to);
    totalMonths += (end.year - start.year) * 12 + (end.month - start.month) + 1;
  });

  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;

  return m > 0 ? `${y}.${Math.round((m / 12) * 10)}y` : `${y}y`;
};

export const useTotalExperience = (experiences: Experience[]): string =>
  useMemo(() => totalExperienceText(experiences), [experiences]);
