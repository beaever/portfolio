interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
}

// 모노크롬에서는 글자색만으로 강조가 안 되므로 색을 채워 반전시킨다.
export function HighlightText({ children, className = '' }: HighlightTextProps) {
  return (
    <span
      className={`rounded-lg bg-[var(--main)] px-2.5 text-[var(--on-main)] box-decoration-clone ${className}`}
    >
      {children}
    </span>
  );
}
