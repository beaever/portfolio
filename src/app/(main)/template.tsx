'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PageNav } from '@/components/layout/PageNav';

// 첫 로드는 SSR 된 내용을 바로 보여줘야 하므로 라우트 이동부터 등장 애니메이션을 건다.
let hasNavigated = false;

export default function MainTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={hasNavigated && !reducedMotion ? { opacity: 0, y: 28 } : false}
      animate={{ opacity: 1, y: 0 }}
      // 카메라가 다음 화면으로 움직이는 동안 기다렸다가 콘텐츠를 드러낸다.
      transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
      <PageNav />
    </motion.div>
  );
}
