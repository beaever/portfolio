// feTurbulence 는 래스터화 비용이 큰 필터라 뷰포트 전체에 걸면 초기 페인트와
// 리사이즈마다 그만큼을 다시 계산한다. 동일한 그레인을 타일 하나로 만들어 반복시킨다.
// stitchTiles='stitch' 덕분에 이음새가 보이지 않는다.
const NOISE_TILE_SIZE = 256;

const noiseTile = `<svg xmlns='http://www.w3.org/2000/svg' width='${NOISE_TILE_SIZE}' height='${NOISE_TILE_SIZE}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`;

const noiseDataUri = `url("data:image/svg+xml,${encodeURIComponent(noiseTile)}")`;

export function NoiseTexture() {
  return (
    <div
      aria-hidden='true'
      className='fixed inset-0 pointer-events-none z-[1] opacity-[0.15]'
      style={{
        backgroundImage: noiseDataUri,
        backgroundRepeat: 'repeat',
        backgroundSize: `${NOISE_TILE_SIZE}px ${NOISE_TILE_SIZE}px`,
      }}
    />
  );
}
