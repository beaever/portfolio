/**
 * CodeBlock Component
 *
 * Hero 섹션의 타이핑 애니메이션 코드 블록
 */

import { motion } from 'framer-motion';

interface CodeBlockProps {
  typedText: string;
}

export function CodeBlock({ typedText }: CodeBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className='border-l border-[var(--border-primary)] pl-6'
    >
      <pre className='font-mono text-small text-[var(--text-secondary)] whitespace-pre-wrap'>
        {typedText}
        <span className='animate-pulse'>|</span>
      </pre>
    </motion.div>
  );
}
