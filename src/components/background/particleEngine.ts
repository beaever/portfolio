/**
 * 입자로 그린 거대한 글자 띠를 WebGL2 로 렌더링한다.
 * 움직임은 셰이더에서 계산해 메인 스레드는 uniform 갱신만 한다.
 */

import { NAV_ITEMS } from '@/constants/data';

const WORDS = NAV_ITEMS.map((item) => item.word);
// NAV_ITEMS 순서와 같다. 본문을 읽는 페이지일수록 어둡게 둔다.
const SECTION_DIM = [1, 0.6, 0.55, 0.7, 0.8];
const FLOATS_PER_PARTICLE = 6; // x, y, z, 밝기, 흐름 속도, 반복 폭
const STRIDE = FLOATS_PER_PARTICLE * Float32Array.BYTES_PER_ELEMENT;
const INTRO_MS = 2400;
const ROUTE_MS = 1300;
const MIN_DRAW = 1 << 13;
const PULSE_S = 2; // 충격파가 사라지는 시간
const PULSE_COUNT = 6; // 동시에 퍼질 수 있는 충격파 수. 넘치면 가장 오래된 것부터 덮어쓴다.
// 섹션별 카메라 자세: yaw, pitch, roll, dolly(+는 뒤로 물러남)
const CAMERA_POSES = [
  [0.08, -0.05, -0.012, 0],
  [-0.18, 0.07, 0.02, 0.15],
  [0.2, -0.08, -0.025, 0.2],
  [-0.12, 0.12, 0.015, 0.1],
  [0, 0, 0, -0.05],
];

interface Row {
  text: string;
  centerY: number;
  font: number;
  speed: number;
  brightness: number;
  share: number;
  depth: number;
}

interface Form {
  buffer: WebGLBuffer;
  wind: number;
  dim: number;
}

const VERTEX_SHADER = `#version 300 es
precision highp float; precision highp int;
in vec4 aA, aB;
in vec2 aFlowA, aFlowB;
uniform float uMorph, uTime, uFlow, uAspect, uIntro, uDim, uGain, uSize, uInk, uPointer, uDolly, uDissolve;
uniform mat3 uCamera;
uniform vec2 uPointerPos, uWind;
uniform vec3 uPulse[${PULSE_COUNT}]; // xy: 화면 위치, z: 경과 초
uniform vec3 uBase;
out vec3 vColor;
out float vAlpha;

float hash(uint x) { x ^= x >> 16u; x *= 0x85ebca6bu; x ^= x >> 13u; x *= 0xc2b2ae35u; x ^= x >> 16u; return float(x >> 8u) / 16777215.0; }
float ease(float x) { return x * x * x * (x * (x * 6.0 - 15.0) + 10.0); }
float wrapX(float x, vec2 flow) { return mod(x + flow.x * uFlow + flow.y * 0.5, flow.y) - flow.y * 0.5; }

void main() {
  uint id = uint(gl_VertexID);
  float h1 = hash(id), h2 = hash(id + 70001u), h3 = hash(id + 140009u);
  float delay = h1 * 0.45;
  float e = ease(clamp((uMorph - delay) / (1.0 - delay), 0.0, 1.0));
  vec3 a = vec3(wrapX(aA.x, aFlowA), aA.yz), b = vec3(wrapX(aB.x, aFlowB), aB.yz);
  vec3 p = mix(a, b, e);
  vec3 scatter = vec3(h2, h3, hash(id + 210011u)) * 2.0 - 1.0;
  p += scatter * sin(3.14159 * e) * vec3(0.6, 0.5, 0.18);
  p.xy += vec2(sin(p.y * 3.1 + uTime * 0.4 + h1 * 6.28), cos(p.x * 3.3 - uTime * 0.35 + h2 * 6.28)) * 0.004;

  // 일부 입자가 화면 오른쪽으로 갈수록 글자에서 떨어져 나간다.
  float windOn = (h2 > 0.62 ? 1.0 : 0.0) * mix(uWind.x, uWind.y, e) * smoothstep(-0.2, 0.8, p.x / uAspect);
  float phase = fract(uTime * (0.06 + 0.1 * h3) + h1);
  p.x += windOn * phase * phase * 1.9;
  p.y += windOn * (sin(phase * 6.0 + h1 * 6.28) * 0.08 + phase * 0.6 * (h3 - 0.5));

  // 첫 등장: 중심에서 터져 나간 뒤 글자로 모인다.
  float gather = ease(clamp((uIntro - 0.22) * 1.9 - h1 * 0.45, 0.0, 1.0));
  vec3 burst = vec3(normalize(scatter.xy + 1e-4) * (0.2 + 2.3 * h3) * vec2(uAspect, 1.0), 0.0) * smoothstep(0.0, 0.26, uIntro);
  p = mix(burst, p, gather);
  // 스크롤해 본문으로 내려가면 글자가 공간으로 흩어진다.
  p += scatter * uDissolve * vec3(0.7, 0.45, 0.4) * (0.3 + h3);

  p = uCamera * p;
  float depth = 2.0 / max(0.35, 2.0 + p.z + uDolly);
  vec2 q = p.xy * depth;
  vec2 fromPointer = q - uPointerPos;
  float r2 = dot(fromPointer, fromPointer);
  // 커서 주변 원: 반경은 r2 의 분모, 밀어내는 거리는 뒤의 계수로 조절한다.
  q += (r2 > 1e-5 ? fromPointer / sqrt(r2) : vec2(0.0)) * exp(-r2 / 0.02) * 0.12 * uPointer;
  float lit = exp(-r2 / 0.035) * uPointer;

  // 클릭 지점마다 퍼지는 고리 모양 충격파. 각자 끝까지 퍼지며 서로 겹친다.
  vec2 origin = q;
  for (int i = 0; i < ${PULSE_COUNT}; i++) {
    vec2 fromPulse = origin - uPulse[i].xy;
    float pr = length(fromPulse);
    float ring = exp(-pow((pr - uPulse[i].z * 1.6) / 0.14, 2.0)) * exp(-uPulse[i].z * 1.8);
    q += fromPulse / max(pr, 1e-3) * ring * (0.12 + 0.3 * h3);
    lit += ring * 1.5;
  }

  float brightness = mix(aA.w, aB.w, e) * uDim * uGain * (1.0 - windOn * phase) * (1.0 + 1.4 * (1.0 - gather)) * clamp(depth * 1.1, 0.4, 1.5);
  vColor = uInk > 0.5 ? uBase : uBase * brightness * (1.0 + lit * 1.6);
  vAlpha = clamp(brightness * (1.0 + lit), 0.0, 1.0);
  gl_PointSize = uSize * (0.7 + h2 * 0.6) * clamp(depth, 0.4, 3.0) * (1.0 + lit * 0.7);
  gl_Position = vec4(q.x / uAspect, q.y, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec3 vColor;
in float vAlpha;
uniform float uInk, uSoft;
out vec4 outColor;
void main() {
  float d = length(gl_PointCoord * 2.0 - 1.0);
  float a = uSoft > 0.5 ? pow(max(0.0, 1.0 - d), 2.0) : smoothstep(1.0, 0.35, d);
  outColor = uInk > 0.5 ? vec4(vColor, a * vAlpha) : vec4(vColor * a, 1.0);
}`;

const clamp = (x: number, min: number, max: number) =>
  Math.min(max, Math.max(min, x));

const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

// 빌드 시 #FFFFFF 가 #fff 로 압축되므로, 브라우저가 #rrggbb 로 정규화한 값을 읽는다.
const colorParser = () => {
  const context = document.createElement('canvas').getContext('2d');
  return (value: string): number[] => {
    if (!context) return [0, 0, 0];
    context.fillStyle = value.trim();
    const n = parseInt(String(context.fillStyle).slice(1), 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  };
};

const seededRandom = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('셰이더 생성 실패');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? '셰이더 컴파일 실패');
  }
  return shader;
}

export function createParticleEngine(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl2', {
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance',
  });
  // WebGL2 가 없으면 캔버스 없이 기본 배경으로 동작한다.
  if (!gl) return null;

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? '셰이더 링크 실패');
  }
  gl.useProgram(program);
  gl.bindVertexArray(gl.createVertexArray());
  gl.disable(gl.DEPTH_TEST);
  gl.enable(gl.BLEND);

  const uniformCache = new Map<string, WebGLUniformLocation | null>();
  const uniform = (name: string) => {
    if (!uniformCache.has(name)) uniformCache.set(name, gl.getUniformLocation(program, name));
    return uniformCache.get(name) ?? null;
  };
  const parseColor = colorParser();
  const attributes = ['aA', 'aFlowA', 'aB', 'aFlowB'].map((name) => {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    return location;
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const particleCount = window.innerWidth < 760 ? 1 << 16 : 1 << 18;
  const bodyStyle = getComputedStyle(document.body);
  const fontFamily = bodyStyle.getPropertyValue('--font-geist-sans').trim() || 'sans-serif';

  let drawCount = particleCount;
  let width = 1;
  let height = 1;
  let aspect = 1;
  let pixelRatio = 1;
  let forms: (Form | undefined)[] = [];
  let routeFrom = 0;
  let routeTo = 0;
  let routeStart = -Infinity;
  let paused = false;
  let stage = false;
  const pulses = Array.from({ length: PULSE_COUNT }, () => ({ x: 0, y: 0, start: -Infinity }));
  const pulseData = new Float32Array(PULSE_COUNT * 3);
  let nextPulse = 0;
  let ready = false;
  let colorsDirty = true;
  let colors = { background: [0, 0, 0], base: [1, 1, 1], ink: false };
  let frameId = 0;
  let destroyed = false;
  let idleTimer = 0;
  let resizeTimer = 0;
  let lastFrame = performance.now();
  let introStart = lastFrame;
  let time = 0;
  let flow = 0;
  let lastScroll = window.scrollY;
  let scrollSpeed = 0;
  let frameSamples = 0;
  let frameTotal = 0;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, amount: 0, targetAmount: 0 };

  function rasterRow(row: Row) {
    const measure = document.createElement('canvas').getContext('2d');
    if (!measure) return null;
    const font = `800 ${row.font}px ${fontFamily}`;
    measure.font = font;
    const textWidth = measure.measureText(`${row.text} `).width;
    // 줄바꿈 지점이 항상 화면 밖에 있도록 뷰포트보다 넓게 반복한다.
    const perspective = (2 + row.depth) / 2;
    const repeat = Math.ceil((width * 1.9 * perspective) / textWidth); // 카메라가 돌아도 이음새가 보이지 않는 폭
    const tile = textWidth * repeat;
    const columns = Math.min(4096, Math.ceil(tile / 2));
    const scale = columns / tile;
    const rows = Math.ceil(row.font * 1.2 * scale);
    const raster = document.createElement('canvas');
    raster.width = columns;
    raster.height = rows;
    const context = raster.getContext('2d', { willReadFrequently: true });
    if (!context) return null;
    context.scale(scale, scale);
    context.font = font;
    context.textBaseline = 'middle';
    context.fillStyle = '#fff';
    for (let i = 0; i < repeat; i++) {
      context.fillText(row.text, i * textWidth, row.font * 0.6);
    }
    const { data } = context.getImageData(0, 0, columns, rows);
    const filled: number[] = [];
    for (let i = 3, pixel = 0; i < data.length; i += 4, pixel++) {
      if (data[i] > 100) filled.push(pixel);
    }
    return { filled, columns, tile, scale };
  }

  function layoutRows(index: number): Row[] {
    // 좁은 화면에서는 글자가 뭉개지지 않도록 크게 그린다.
    const unit = width * (width < 860 ? 1.7 : 1);
    // y: 화면 세로 위치, size: 화면 폭 대비 보이는 글자 크기, depth: 클수록 멀다
    const layers = [
      { y: 0.1, size: 0.1, depth: 1.5, speed: -0.05, brightness: 0.55 },
      { y: 0.24, size: 0.2, depth: 0.1, speed: -0.16, brightness: 1 },
      { y: 0.41, size: 0.11, depth: 1.1, speed: 0.07, brightness: 0.65 },
      { y: 0.56, size: 0.16, depth: 0.5, speed: -0.11, brightness: 0.85 },
      { y: 0.71, size: 0.1, depth: 1.6, speed: 0.05, brightness: 0.55 },
      { y: 0.87, size: 0.19, depth: 0.2, speed: 0.14, brightness: 0.95 },
    ];
    const totalWeight = layers.reduce((sum, layer) => sum + layer.size, 0);
    return layers.map((layer) => {
      // 멀리 있어도 지정한 위치와 크기로 보이도록 원근만큼 키워서 배치한다.
      const perspective = (2 + layer.depth) / 2;
      return {
        text: WORDS[index],
        centerY: height / 2 + (layer.y * height - height / 2) * perspective,
        font: layer.size * unit * perspective,
        speed: layer.speed * perspective,
        brightness: layer.brightness,
        share: layer.size / totalWeight,
        depth: layer.depth,
      };
    });
  }

  function buildForm(index: number) {
    const existing = forms[index];
    if (existing) return existing;
    const random = seededRandom(index + 11);
    const data = new Float32Array(particleCount * FLOATS_PER_PARTICLE);
    const rows = layoutRows(index);
    const pickRow = () => {
      let roll = random();
      for (const row of rows) {
        roll -= row.share;
        if (roll <= 0) return row;
      }
      return rows[rows.length - 1];
    };
    const rasters = new Map(rows.map((row) => [row, rasterRow(row)]));
    const worldPerPixel = 2 / height;

    // 입자 순서가 무작위라 성능이 부족하면 앞쪽 일부만 그려도 글자 형태가 유지된다.
    for (let i = 0; i < particleCount; i++) {
      const row = pickRow();
      const raster = rasters.get(row);
      if (!raster || raster.filled.length === 0) continue;
      const pixel = raster.filled[Math.floor(random() * raster.filled.length)];
      const px = ((pixel % raster.columns) + random()) / raster.scale;
      const py = (Math.floor(pixel / raster.columns) + random()) / raster.scale;
      const offset = i * FLOATS_PER_PARTICLE;
      data[offset] = (px / raster.tile - 0.5) * raster.tile * worldPerPixel;
      data[offset + 1] = 1 - (row.centerY - row.font * 0.6 + py) * worldPerPixel;
      data[offset + 2] = row.depth + (random() - 0.5) * 0.16;
      data[offset + 3] = (0.55 + random() * 0.45) * row.brightness;
      data[offset + 4] = row.speed;
      data[offset + 5] = raster.tile * worldPerPixel;
    }

    const buffer = gl!.createBuffer();
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
    gl!.bufferData(gl!.ARRAY_BUFFER, data, gl!.STATIC_DRAW);
    const form = { buffer, wind: index === 0 ? 0.6 : 0.25, dim: SECTION_DIM[index] };
    forms[index] = form;
    return form;
  }

  // 한 프레임에 전부 만들면 긴 작업이 되므로 첫 화면 이후 하나씩 준비한다.
  function buildNextIdle() {
    const next = WORDS.findIndex((_, i) => !forms[i]);
    if (next < 0) return;
    idleTimer = window.setTimeout(() => {
      buildForm(next);
      buildNextIdle();
    }, 200);
  }

  function dropForms() {
    forms.forEach((form) => form && gl!.deleteBuffer(form.buffer));
    forms = [];
    window.clearTimeout(idleTimer);
    buildNextIdle();
  }

  function measure() {
    pixelRatio = Math.min(2, window.devicePixelRatio || 1);
    width = window.innerWidth;
    height = window.innerHeight;
    aspect = width / height;
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    gl!.viewport(0, 0, canvas.width, canvas.height);
  }

  function readColors() {
    // MainLayout 이 자식 effect 뒤에 테마 클래스를 바꾸므로 프레임 시점에 읽는다.
    const style = getComputedStyle(document.documentElement);
    const read = (name: string) => parseColor(style.getPropertyValue(name));
    colors = {
      background: read('--bg-primary'),
      base: read('--text-primary'),
      ink: document.documentElement.classList.contains('light'),
    };
    colorsDirty = false;
  }

  function bindForm(form: Form, position: number, flowAttribute: number) {
    gl!.bindBuffer(gl!.ARRAY_BUFFER, form.buffer);
    gl!.vertexAttribPointer(position, 4, gl!.FLOAT, false, STRIDE, 0);
    gl!.vertexAttribPointer(flowAttribute, 2, gl!.FLOAT, false, STRIDE, 16);
  }

  function updateCamera(transition: number, intro: number) {
    const from = CAMERA_POSES[routeFrom];
    const to = CAMERA_POSES[routeTo];
    const blend = smoothstep(0, 1, transition);
    const travel = Math.sin(Math.PI * transition);
    const direction = Math.sign(routeTo - routeFrom);
    let [yaw, pitch, roll, dolly] = from.map((value, i) => value + (to[i] - value) * blend);

    // 페이지 이동: 입자 사이를 앞으로 밀고 들어갔다가 다음 화면에서 멈춘다.
    yaw += travel * direction * 0.08;
    dolly -= travel * 0.28;
    if (animating()) {
      const entry = (1 - intro) * (1 - intro);
      yaw += entry * 0.45 + Math.sin(time * 0.17) * 0.015;
      pitch += Math.cos(time * 0.13) * 0.012;
      roll += entry * 0.1;
      dolly += Math.min(scrollSpeed / 6000, 0.08) - entry * 0.5;
    }
    yaw += (pointer.x / aspect) * 0.04 * pointer.amount;
    pitch -= pointer.y * 0.03 * pointer.amount;

    const [cy, sy] = [Math.cos(yaw), Math.sin(yaw)];
    const [cx, sx] = [Math.cos(pitch), Math.sin(pitch)];
    const [cz, sz] = [Math.cos(roll), Math.sin(roll)];
    const row1 = [cy, 0, sy];
    const row2 = [sx * sy, cx, -sx * cy];
    const row3 = [-cx * sy, sx, cx * cy];
    const column = (i: number) => [cz * row1[i] - sz * row2[i], sz * row1[i] + cz * row2[i], row3[i]];
    gl!.uniformMatrix3fv(uniform('uCamera'), false, [...column(0), ...column(1), ...column(2)]);
    gl!.uniform1f(uniform('uDolly'), dolly);
  }

  function animating() {
    return !paused && !reducedMotion;
  }

  function kick() {
    if (ready && !destroyed && !frameId) frameId = requestAnimationFrame(frame);
  }

  function frame(now: number) {
    frameId = 0;
    const delta = Math.min((now - lastFrame) / 1000, 0.1);
    const rawDelta = (now - lastFrame) / 1000;
    lastFrame = now;
    if (colorsDirty) readColors();

    const scroll = window.scrollY;
    const instantSpeed = Math.abs(scroll - lastScroll) / Math.max(delta, 0.001);
    lastScroll = scroll;
    scrollSpeed += (instantSpeed - scrollSpeed) * 0.12;

    const transition = reducedMotion ? 1 : clamp((now - routeStart) / ROUTE_MS, 0, 1);
    const routeBoost = Math.sin(Math.PI * transition) * 5;

    if (animating()) {
      time += delta;
      // 스크롤이 빠를수록 글자 띠도 빨라진다.
      flow += delta * (1 + Math.min(scrollSpeed / 450, 2) + routeBoost);
      if (rawDelta > 0.001 && rawDelta < 0.25 && document.visibilityState === 'visible') {
        frameSamples++;
        frameTotal += rawDelta;
      }
      if (frameSamples >= 90) {
        if (frameTotal / frameSamples > 0.03 && drawCount > MIN_DRAW) drawCount >>= 1;
        frameSamples = 0;
        frameTotal = 0;
      }
    }

    pointer.x += (pointer.targetX - pointer.x) * 0.14;
    pointer.y += (pointer.targetY - pointer.y) * 0.14;
    const pointerGoal = paused ? 0 : pointer.targetAmount;
    pointer.amount += (pointerGoal - pointer.amount) * 0.1;

    const from = buildForm(routeFrom);
    const to = buildForm(routeTo);
    const intro = animating() ? clamp((now - introStart) / INTRO_MS, 0, 1) : 1;

    const { background, base, ink } = colors;
    gl!.clearColor(background[0], background[1], background[2], 1);
    gl!.clear(gl!.COLOR_BUFFER_BIT);
    // 곱하기 합성은 겹칠수록 검게 뭉개지므로 라이트 모드는 알파 합성을 쓴다.
    if (ink) gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA);
    else gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_COLOR);

    bindForm(from, attributes[0], attributes[1]);
    bindForm(to, attributes[2], attributes[3]);
    updateCamera(transition, intro);
    gl!.uniform1f(uniform('uMorph'), transition);
    gl!.uniform1f(uniform('uTime'), time);
    gl!.uniform1f(uniform('uFlow'), flow);
    gl!.uniform1f(uniform('uAspect'), aspect);
    gl!.uniform1f(uniform('uIntro'), intro);
    // 내려서 본문을 읽기 시작하면 배경을 낮추고 흩뜨린다. 라이브 모드에서는 배경이 주인공이다.
    const scrollDim = 1 - 0.3 * smoothstep(0, height * 0.6, scroll);
    const dim = stage ? 1 : (from.dim + (to.dim - from.dim) * transition) * scrollDim;
    gl!.uniform1f(uniform('uDim'), dim);
    gl!.uniform1f(uniform('uDissolve'), stage || !animating() ? 0 : smoothstep(0, height * 1.5, scroll));
    let pulseAge = Infinity; // 가장 최근 충격파의 경과 시간
    pulses.forEach(({ x, y, start }, i) => {
      const age = (now - start) / 1000;
      pulseAge = Math.min(pulseAge, age);
      pulseData.set([x, y, Math.min(age, 99)], i * 3);
    });
    gl!.uniform3fv(uniform('uPulse'), pulseData);
    gl!.uniform1f(uniform('uInk'), ink ? 1 : 0);
    gl!.uniform1f(uniform('uPointer'), pointer.amount);
    gl!.uniform2f(uniform('uPointerPos'), pointer.x, pointer.y);
    gl!.uniform2f(uniform('uWind'), from.wind, to.wind);
    gl!.uniform3fv(uniform('uBase'), base);

    // 입자 수를 줄여도 전체 밝기는 유지한다. 스크롤 중에는 잠깐 더 밝힌다.
    const gain = (ink ? 0.44 : 0.4) * Math.sqrt(particleCount / drawCount) * (1 + Math.min(scrollSpeed / 6000, 0.15));
    gl!.uniform1f(uniform('uGain'), Math.min(1.8, gain));
    // 밝은 배경의 어두운 점은 빛나는 점보다 작아 보여 크기를 보정한다.
    gl!.uniform1f(uniform('uSize'), (ink ? 1.8 : 1.6) * pixelRatio);
    gl!.uniform1f(uniform('uSoft'), 0);
    gl!.drawArrays(gl!.POINTS, 0, drawCount);

    // 일부 입자만 크고 흐리게 한 번 더 그려 글자 주변에 번짐을 만든다.
    gl!.uniform1f(uniform('uGain'), Math.min(0.2, gain * (ink ? 0.05 : 0.12)));
    gl!.uniform1f(uniform('uSize'), 9 * pixelRatio);
    gl!.uniform1f(uniform('uSoft'), 1);
    gl!.drawArrays(gl!.POINTS, 0, drawCount >> 3);

    if (transition >= 1) routeFrom = routeTo;
    if (animating() || transition < 1 || pulseAge < PULSE_S || Math.abs(pointer.amount - pointerGoal) > 0.01) kick();
  }

  const handlePointerMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return;
    [pointer.targetX, pointer.targetY] = toWorld(event.clientX, event.clientY);
    pointer.targetAmount = 1;
    kick();
  };
  const toWorld = (clientX: number, clientY: number) => [
    (clientX / width) * 2 * aspect - aspect,
    1 - (clientY / height) * 2,
  ];
  function pulse(clientX = Math.random() * width, clientY = Math.random() * height) {
    if (reducedMotion) return;
    const slot = pulses[nextPulse];
    nextPulse = (nextPulse + 1) % PULSE_COUNT;
    [slot.x, slot.y] = toWorld(clientX, clientY);
    slot.start = performance.now();
    kick();
  }
  // 링크나 버튼을 누를 때는 터뜨리지 않는다.
  const handlePointerDown = (event: PointerEvent) => {
    const target = event.target as Element | null;
    if (target?.closest('a, button, input, textarea, select, label, [role="button"]')) return;
    pulse(event.clientX, event.clientY);
  };
  const handlePointerLeave = () => {
    pointer.targetAmount = 0;
    kick();
  };
  const handleResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const previousWidth = width;
      const previousHeight = height;
      measure();
      // 모바일 주소창처럼 높이만 조금 변하면 입자 위치를 다시 만들지 않는다.
      if (width !== previousWidth || Math.abs(height - previousHeight) > 120) dropForms();
      kick();
    }, 160);
  };

  // GPU 가 리셋되면 버퍼가 모두 사라진다. 빈 루프를 돌리지 않고 기본 배경으로 물러난다.
  // shortcut: 복구(webglcontextrestored)는 하지 않는다. 새로고침하면 다시 그린다.
  const handleContextLost = () => {
    engine.destroy();
    canvas.hidden = true;
  };
  canvas.addEventListener('webglcontextlost', handleContextLost);

  async function start() {
    await Promise.race([
      document.fonts.load(`800 120px ${fontFamily}`),
      new Promise((resolve) => window.setTimeout(resolve, 1500)),
    ]);
    if (destroyed) return;
    measure();
    ready = true;
    lastFrame = performance.now();
    introStart = lastFrame;
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);
    kick();
    buildNextIdle();
  }
  void start();

  const engine = {
    refreshTheme() {
      colorsDirty = true;
      kick();
    },
    setRoute(index: number) {
      if (index === routeTo) return;
      const now = performance.now();
      if (!ready || reducedMotion) {
        routeFrom = index;
        routeTo = index;
        kick();
        return;
      }
      // shortcut: 전환 도중 다시 이동하면 가까운 형태에서 재시작해 입자가 살짝 튄다. 눈에 띄면 현재 위치 기반 보간으로 교체.
      if (now - routeStart >= ROUTE_MS / 2) routeFrom = routeTo;
      routeTo = index;
      routeStart = now;
      kick();
    },
    pulse,
    setStage(value: boolean) {
      stage = value;
      kick();
    },
    setPaused(value: boolean) {
      paused = value;
      lastFrame = performance.now();
      kick();
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frameId);
      window.clearTimeout(idleTimer);
      window.clearTimeout(resizeTimer);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      forms.forEach((form) => form && gl.deleteBuffer(form.buffer));
      forms = [];
    },
  };
  return engine;
}
