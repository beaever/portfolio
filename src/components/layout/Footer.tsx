import { Text } from '@/components/ui/Text';
import { PROFILE } from '@/constants/data';

export function Footer() {
  return (
    // 블러가 시작되는 직선 경계가 보이지 않도록 윗부분을 페이드시킨다.
    <footer className='pt-16 pb-8 glass border-0 shadow-none before:hidden relative z-10 [mask-image:linear-gradient(to_bottom,transparent,#000_55%)]'>
      <div className='max-w-7xl mx-auto px-6 md:px-12 text-center'>
        <Text.Body size='sm' color='secondary'>
          © {new Date().getFullYear()} {PROFILE.logo}. All rights reserved.
        </Text.Body>
      </div>
    </footer>
  );
}
