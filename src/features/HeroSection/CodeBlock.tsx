/**
 * CodeBlock Component
 * 
 * Hero 섹션의 타이핑 애니메이션 코드 블록
 */

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/common/GlassCard';

interface CodeBlockProps {
  typedText: string;
}

export function CodeBlock({ typedText }: CodeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <GlassCard padding="lg">
        <pre className='font-mono text-sm md:text-base text-[var(--text-primary)] whitespace-pre-wrap'>
          {typedText}
          <span className='animate-pulse'>|</span>
        </pre>
      </GlassCard>
    </motion.div>
  );
}
