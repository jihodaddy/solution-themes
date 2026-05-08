# solution-themes Design System

## 1. Why these 4 themes

각 테마는 서로 다른 사용 맥락을 위해 존재한다. 모두에게 맞는 하나의 테마는 없으므로 4개를 의도적으로 분리.

- **Warm Editorial** — 글이 주인공인 화면. 블로그, 출판, 긴 글 읽기.
- **Nordic Calm** — 데이터를 차분히 들여다보는 화면. 분석, 설정, 생산성 도구.
- **Data Terminal** — 숫자가 핵심인 화면. ERP, 회계, 재무 대시보드.
- **Productivity Pro** — 빠르게 흐름을 가르는 화면. 칸반, 작업 관리, 내부 SaaS.

선택의 안티패턴: ERP에 Editorial을 쓰지 않는다. 글에 Data Terminal을 쓰지 않는다. 결을 잘못 맞추면 결국 시스템 전체를 의심하게 된다.

## 2. Token taxonomy

3단 레이어:

1. **Primitives** — 원시값. 직접 노출하지 않음.
2. **Semantic** — `--primary`, `--background` 등 의미값. shadcn 컴포넌트가 보는 유일한 레이어.
3. **Component** — `--table-row-height` 같은 컴포넌트 전용. 변종 컴포넌트에서만 사용.

**shadcn 호환성 약속**: shadcn 표준 semantic 토큰 세트는 모든 테마가 그대로 정의한다. 여기에 ERP·대시보드를 위한 `--success`/`--warning`과 헤딩·숫자 분리를 위한 `--font-display`/`--font-numeric`을 확장으로 추가했다.

## 3. Themes

### 3.1 Warm Editorial
- **성격**: 따뜻한 뉴트럴, 세리프 헤딩, 차분한 리듬.
- **어울리는 맥락**: 긴 글, 블로그 포스트, 잡지형 카드 그리드, 출판 인터페이스.
- **피해야 할 맥락**: 빠른 의사결정이 필요한 도구 (대시보드, ERP).
- **변종**: `Card.elegant` — 세리프 캡션 영역 포함.

### 3.2 Nordic Calm
- **성격**: 뮤트 블루-그레이, 넉넉한 여백.
- **어울리는 맥락**: 분석 대시보드, 긴 설정 화면, 차분한 생산성 도구.
- **피해야 할 맥락**: 강한 마케팅 톤이 필요한 화면.
- **변종**: 없음 (순수 토큰 테마).

### 3.3 Data Terminal
- **성격**: 모노스페이스 숫자, +/− 컬러 시그널, 고밀도 정보.
- **어울리는 맥락**: ERP 주문 테이블, 재무 대시보드, 회계.
- **피해야 할 맥락**: 글 중심 콘텐츠, 마케팅 사이트.
- **변종**: `Table.compact`, `StatCard.directional`.

### 3.4 Productivity Pro
- **성격**: 화이트 + 미묘한 그레이 + 컬러 pill 태그.
- **어울리는 맥락**: 칸반 보드, 작업 리스트, 모던 SaaS 내부 도구.
- **피해야 할 맥락**: 보수적 엔터프라이즈 톤.
- **변종**: `Badge.pill`, `StatusDot`.

## 4. Adding a variant

기준 한 가지: **토큰만으로는 표현할 수 없는 차이**가 있을 때만 변종을 추가한다.

색·라운드·폰트로 표현 가능 → 토큰만.
형태가 달라야 함 (예: 더 작은 row height, monospace 숫자 강제, pill 모양 강제) → 변종 추가.

명명 규칙: `<base>-<modifier>.tsx`. shadcn 기본 컴포넌트는 절대 덮어쓰지 않는다.

## 5. Adding a new theme (recipe)

1. `registry/themes/<id>/` 디렉토리 생성.
2. `tokens.ts` — light/dark 토큰 객체 정의 (`SemanticTokens & TypographyTokens & SurfaceTokens`).
3. `theme.css` — `[data-theme="<id>"]`와 `[data-theme="<id>"][data-mode="dark"]` 두 셀렉터로 같은 키들을 CSS 변수로 작성.
4. `meta.ts` — `ThemeMeta` 객체.
5. `lib/themes.ts`에 import + `allThemes` 배열에 추가.
6. `app/themes/[id]/page.tsx`의 `SCENES_BY_THEME`에 적합한 씬 매핑 추가.
7. 테스트 실행 (`pnpm test`) — 토큰 완결성 + registry 빌드 검증.
8. `pnpm build:registry`로 JSON 산출물 확인.

`/design` 페이지의 컬러 스왓치·비교 표는 자동으로 새 테마를 반영한다.
