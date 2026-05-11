# solution-themes Design System

## 1. Why these 5 themes

각 테마는 서로 다른 사용 맥락을 위해 존재한다. 모두에게 맞는 하나의 테마는 없으므로 5개를 의도적으로 분리.

- **Warm Editorial** — 글이 주인공인 화면. 블로그, 출판, 긴 글 읽기.
- **Nordic Calm** — 데이터를 차분히 들여다보는 화면. 분석, 설정, 생산성 도구.
- **Data Terminal** — 숫자가 핵심인 화면. ERP, 회계, 재무 대시보드.
- **Productivity Pro** — 빠르게 흐름을 가르는 화면. 칸반, 작업 관리, 내부 SaaS.
- **Atlas Suite** — 비즈니스 솔루션을 한 곳에서 운영하는 화면. CRM, 다단계 폼, 어드민 콘솔.

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
- **변종**: `card-elegant` — 세리프 캡션 영역 포함.

### 3.2 Nordic Calm
- **성격**: 뮤트 블루-그레이, 넉넉한 여백.
- **어울리는 맥락**: 분석 대시보드, 긴 설정 화면, 차분한 생산성 도구.
- **피해야 할 맥락**: 강한 마케팅 톤이 필요한 화면.
- **변종**: `step-indicator` — 폼/온보딩 흐름의 진행 인디케이터.

### 3.3 Data Terminal
- **성격**: 모노스페이스 숫자, +/− 컬러 시그널, 고밀도 정보.
- **어울리는 맥락**: ERP 주문 테이블, 재무 대시보드, 회계.
- **피해야 할 맥락**: 글 중심 콘텐츠, 마케팅 사이트.
- **변종**: `table-compact`, `stat-card-directional`.

### 3.4 Productivity Pro
- **성격**: 화이트 + 미묘한 그레이 + 컬러 pill 태그.
- **어울리는 맥락**: 칸반 보드, 작업 리스트, 모던 SaaS 내부 도구.
- **피해야 할 맥락**: 보수적 엔터프라이즈 톤.
- **변종**: `badge-pill`, `status-dot`, `toggle-switch`, `sortable-header`.

### 3.5 Atlas Suite
- **성격**: 깊은 바이올렛 primary + 따뜻한 슬레이트 base, 0.75rem 라운드, 부드러운 shadow. 모던 비즈니스 SaaS의 분위기 — 친근하지만 밀도가 살아있다.
- **어울리는 맥락**: CRM 파이프라인, 다단계 온보딩/계약 폼, 어드민 콘솔, B2B 운영 도구.
- **피해야 할 맥락**: 마케팅 헤로, 글 중심 잡지형 콘텐츠.
- **변종**: 전체 — `badge-pill`, `status-dot`, `stat-card-directional`, `table-compact`, `step-indicator`, `toggle-switch`, `sortable-header`, `page-header`, `field`, `empty-state`, `sparkline`, `mini-bar-chart`. 비즈니스 솔루션 한 벌을 짤 때 필요한 거의 모든 조각을 함께 가져온다.

## 4. Variants — 카탈로그

레지스트리 variant는 두 유형으로 갈린다.

### 4.1 인디케이터 & 시그널
| Variant | 역할 |
|---|---|
| `badge-pill` | 의미 톤 5종 라벨 (neutral / primary / success / warning / destructive) |
| `status-dot` | 3 size × 5 tone 점 — 활동 피드, 라이브 상태 |
| `stat-card-directional` | KPI 카드 — delta 부호에 따라 ▲/▼ + 색 자동 |

### 4.2 데이터 & 폼
| Variant | 역할 |
|---|---|
| `table-compact` | 고밀도 테이블 — 컬럼별 정렬/numeric 플래그 |
| `sortable-header` | `<th>` 정렬 헤더 — 활성 컬럼에 chevron |
| `step-indicator` | 다단계 진행 — current 우선 시각화 |
| `toggle-switch` | 부울 필터 칩 (스위치 내장) |
| `page-header` | breadcrumb/eyebrow + title + destructive/secondary/primary 그룹 |
| `field` | label + input 래퍼 — stacked / inline 레이아웃 |
| `empty-state` | 비어있는/오류 상태 — icon + heading + description + CTA |
| `sparkline` | 인라인 SVG 라인 차트 — KPI 옆 트렌드 |
| `mini-bar-chart` | 짧은 분포/시간대 바 차트 |
| `theme-switcher` | 테마 + 모드 선택 (localStorage 자동) |
| `card-elegant` | 매거진형 카드 (세리프 캡션) |

전부 토큰만 사용 — 테마를 바꿔도 색·라운드·폰트가 자동 추종한다.

## 5. Adding a variant

기준 한 가지: **토큰만으로는 표현할 수 없는 차이**가 있을 때만 변종을 추가한다.

색·라운드·폰트로 표현 가능 → 토큰만.
형태가 달라야 함 (예: 더 작은 row height, monospace 숫자 강제, pill 모양 강제) → 변종 추가.

명명 규칙: `<base>-<modifier>.tsx` 또는 단일 명사 (`page-header`, `empty-state`). shadcn 기본 컴포넌트는 절대 덮어쓰지 않는다.

레지스트리에 등록하려면 `scripts/build-registry.ts` 의 `VARIANTS` 배열에 추가하고, 해당 테마들의 `meta.ts` `registryDependencies` 에 variant 이름을 넣는다. 빌드 시점에 `validateRegistryDependencies` 가 누락을 잡아준다.

## 6. Adding a new theme (recipe)

1. `registry/themes/<id>/` 디렉토리 생성.
2. `tokens.ts` — light/dark 토큰 객체 정의 (`SemanticTokens & TypographyTokens & SurfaceTokens`).
3. `meta.ts` — `ThemeMeta` 객체 (`id`, `name`, `description`, `intendedContexts`, `fonts`, `registryDependencies`, `tokens`).
4. `lib/themes.ts` 에 import + `allThemes` 배열에 추가.
5. `registry/types.ts` 의 `ThemeId` 유니온 + `tests/token-completeness.test.ts` 의 `REQUIRED_THEMES` 업데이트.
6. `app/themes/[id]/page.tsx` 의 `SCENES_BY_THEME` 에 적합한 씬 매핑 추가.
7. `app/globals.css` 끝에 `@import "./styles/themes-generated/<id>.css";` 추가.
8. `pnpm test` — 토큰 완결성 + registry 빌드 검증.
9. `pnpm build:registry` — JSON + CSS 산출물 자동 생성 확인.

`/design`, `/playground`, `/compare` 페이지는 자동으로 새 테마를 반영한다 (모두 `allThemes` 를 iterate).

## 7. Showcase 페이지 지도

| 라우트 | 목적 |
|---|---|
| `/` | 테마 카드 그리드 + 진입점 |
| `/themes/<id>` | 테마별 토큰 표 + 코드 스니펫 + 씬 시연 |
| `/playground` | 테마 × 모드 × 씬/컴포넌트 자유 조합 |
| `/compare` | 한 씬을 5개 테마에서 동시 비교 (스케일된 iframe 그리드) |
| `/design` | 디자인 시스템 본 문서 |
| `/agents-md` | AI 에이전트용 `AGENTS.md` 템플릿 생성기 (테마 선택 → 복사/다운로드) |

## 8. 토큰만 쓰는 이유 (한 줄)

테마는 색이 아니라 **결**이다. 시스템 안에서 결을 일관되게 유지하려면 컴포넌트가 색을 보지 않고 의미를 봐야 한다. 의미는 토큰이 가지고 있고, 색은 토큰이 결정한다.
