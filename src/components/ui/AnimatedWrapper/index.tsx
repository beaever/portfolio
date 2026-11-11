/**
 * AnimatedWrapper Component
 *
 * 화면에 들어올 때 한 번 아래에서 떠오르게 하는 래퍼
 *
 * @example
 * <AnimatedWrapper>Content</AnimatedWrapper>
 */

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedWrapper({ children, className }: AnimatedWrapperProps) {
  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}
