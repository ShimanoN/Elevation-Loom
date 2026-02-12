# Elevation Loom (Elvgain Calculator) - Copilot Instructions

## Project Overview

This is a **web application for tracking elevation gain (climbing) progress with weekly targets**. Users log daily elevation gains across multiple sessions and track progress toward weekly goals.

**Target Audience**: The project is specifically designed for **PLC (Programmable Logic Controller) engineers** transitioning to web development. Documentation uses PLC/ST terminology mappings and analogies (e.g., Firestore = 保持型メモリ, async = flag waiting).

## Tech Stack

### Frontend
- **TypeScript** (strict mode, ES2020 target, full ES6 module system)
- **Vite** (dev server + production bundler)
- **HTML5** (two pages: `index.html` and `week-target.html`)
- **CSS3** (traditional styling in `css/style.css`)
- **Canvas API** + **html2canvas** (CDN) for chart rendering and image export

### Storage
- **Firestore** (primary authoritative data store via Firebase SDK)
- **IndexedDB** (read-through/write-through cache layer)
- **LocalStorage** (backup/restore functionality)

### Development Tools
- **Node.js** ≥20.19.0
- **TypeScript** 5.9+ with `strict: true`
- **ESLint v9** with flat config format (`eslint.config.ts`)
- **Prettier** for code formatting
- **Husky** + **lint-staged** for pre-commit hooks

### Testing
- **Vitest** (unit/integration tests with jsdom environment)
- **Playwright** (e2e tests with HTML reports)
- **fake-indexeddb** (mocking IndexedDB in tests)

## Key Architecture Patterns

### ES6 Modules + Vite Bundling

This application uses **ES6 modules** with TypeScript. Each `.ts` file uses `import`/`export` statements. Vite handles module resolution and bundling.

**Entry Points** (loaded via `<script type="module">` in HTML):
- `js/app.ts` — Main page entry point
- `js/week-target.ts` — Week target page entry point

**Import Convention**: Source files use `.js` extensions in imports (standard for `moduleResolution: "bundler"`):
```typescript
import { getDayLog } from './db.js';
import { getISOWeekInfo } from './iso-week.js';
```

### Module Dependency Graph
```
firebase-config.ts (Firebase SDK)
    ↑
storage.ts (Firestore operations, Result types)
    ↑
storage-compat.ts (legacy API compatibility)
    ↑
db.ts (facade layer)
    ↑
app.ts / week-target.ts (UI entry points)
    ↑ uses: calculations, chart, backup, formatters, etc.
```

### Result Type Pattern
- `js/result.ts` provides `Result<T,E>` with `Ok()`/`Err()` constructors
- Storage operations return `Result` types for explicit error handling
- Use `isOk()`/`isErr()` type guards, `unwrap()`, `unwrapOr()` helpers

### Async/Await Pattern
- All database operations use `async/await`
- Always wrap DB operations in `try-catch` blocks with `console.error` logging
- Example:
  ```typescript
  try {
    const dayLog = await getDayLog(date);
  } catch (error) {
    console.error('Error loading day log:', error);
  }
  ```

### Event-Driven Architecture
- Form inputs trigger `blur` events that call save functions
- Navigation uses CustomEvent for date changes
- Backup system wraps save functions to schedule automatic backups

## Coding Guidelines

### Code Style (Enforced by ESLint + Prettier)
- **Indentation**: 2 spaces (never tabs)
- **Quotes**: Single quotes for strings
- **Semicolons**: Required
- **Line width**: 80 characters max
- **Trailing commas**: ES5 style (objects/arrays only, not function params)

### TypeScript Guidelines
- **Strict mode** is enabled — no implicit `any`, null checks required
- Use **interfaces** for domain models (defined in `js/types.ts`)
- Use **explicit return types** on exported functions
- Use `declare global` in `js/global.d.ts` for window extensions (never `as any`)
- Prefer `type` imports: `import type { WeekData } from './types.js'`

### Naming Conventions
- **Functions**: camelCase (e.g., `getDayLog`, `calculateWeekTotal`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DB_NAME`, `DB_VERSION`)
- **Interfaces/Types**: PascalCase (e.g., `WeekData`, `DailyLogEntry`)
- **Variables**: camelCase with descriptive names

### Documentation Requirements
- Add JSDoc comments for all functions:
  ```typescript
  /**
   * Get day log data for a specific date
   * @param dateStr - Date in YYYY-MM-DD format
   * @returns Day log object or null
   */
  async function getDayLog(dateStr: string): Promise<DayLog | null> { ... }
  ```

### Input Validation (Security Critical)
- **Always validate numeric inputs** with `isNaN()` checks
- **Check for negative values** before processing
- **Use date utilities** from `date-utils.ts`:
  - `formatDateLocal(date)` - Format dates for display/storage
  - `parseDateLocal(dateStr)` - Parse date strings with validation
  - **NEVER** use `new Date("YYYY-MM-DD")` directly

### Error Handling
- All database operations must have try-catch blocks
- Log errors with `console.error` including context
- Provide user feedback for errors (alerts or UI messages)

## Data Model

### Firestore Schema (Authoritative)

**WeekData** (path: `users/{uid}/weeks/{isoYear-weekNumber}`):
```typescript
interface WeekData {
  isoYear: number;
  isoWeek: number;
  target: { value: number; unit: string };
  dailyLogs: DailyLogEntry[];
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}
```

### Legacy IndexedDB Types (backward compatibility)
- `DayLog` and `WeekTarget` interfaces in `js/types.ts` / `js/db.ts`
- `migration-adapter.ts` converts between legacy and new formats

## Testing Requirements

### Unit Tests (Vitest)
- Test files: `test/*.test.ts`
- Use fake-indexeddb for mocking
- Target: 89%+ code coverage (current level)
- Run with: `npm test` or `npm run test:coverage`

### E2E Tests (Playwright)
- Test files: `e2e/*.spec.js`
- Uses Vite dev server on localhost:8000
- Tests Chrome + Firefox browsers
- Run with: `npm run e2e` or `npm run e2e:ui`

### Testing Guidelines
- Write tests for new functions/features
- Use descriptive test names: `test('should calculate week total correctly', ...)`
- Test edge cases: null values, invalid dates, negative numbers

## Security Practices

### Input Sanitization
- Validate all user inputs before processing or storing
- Check for NaN on numeric inputs
- Sanitize data before database operations

### Data Validation
```typescript
const elevation = parseFloat(input.value);
if (isNaN(elevation) || elevation < 0) {
  console.error('Invalid elevation value');
  return;
}
```

### No Secrets in Code
- Firebase config is public (client-side SDK, secured by Firestore rules)
- LocalStorage used only for non-sensitive backup data

## File Organization

### Directory Structure
```
/js/              - Core application TypeScript
/js/dev/          - Development-only files (not in production)
/css/             - Stylesheets
/docs/            - Documentation (PLC engineer focused)
/test/            - Unit/integration tests (.ts)
/e2e/             - End-to-end tests (.js, Playwright)
/scripts/         - Build/utility scripts
/public/          - Static assets
```

### Key Source Files
- `js/types.ts` — Core domain type definitions
- `js/result.ts` — Result monad for error handling
- `js/global.d.ts` — Global window type extensions
- `js/storage.ts` — Firestore + cache gateway
- `js/db.ts` — Database facade (public API)
- `js/constants.ts` — Application constants (`as const`)

## Build/Run/Test Commands

### Setup
```bash
npm install  # Install dependencies and setup Git hooks
```

### Development
```bash
npm run dev           # Start Vite dev server (port 8000)
npm run build         # Production build (tsc + vite build)
npm run preview       # Preview production build
npm run typecheck     # TypeScript type check only
```

### Code Quality
```bash
npm run lint          # Check ESLint errors
npm run lint:fix      # Auto-fix ESLint errors
npm run format        # Format code with Prettier
npm run format:check  # Check formatting without changes
```

### Testing
```bash
npm test              # Run Vitest tests (watch mode)
npm run test:ui       # Run Vitest with UI
npm run test:coverage # Generate coverage report
npm run e2e           # Run Playwright e2e tests
npm run e2e:ui        # Run Playwright with UI
```

### Pre-commit Hooks
- Husky automatically runs ESLint + Prettier on staged files
- Fixes are applied automatically when possible
- Commit will fail if unfixable linting errors exist

## Documentation for PLC Engineers

The project has extensive documentation tailored for PLC/ladder logic engineers:

- **docs/QUICK_START_FOR_PLC_ENGINEERS.md** - 30-minute onboarding guide
- **docs/CODE_WALKTHROUGH.md** - Detailed code explanation with PLC analogies
- **docs/LEARNING_PATH.md** - Phase-based learning progression
- **docs/DOCUMENTATION_INDEX.md** - Central hub for all documentation

### PLC Terminology Mappings
When writing documentation or comments for this audience:
- **Function Block (FB)** → TypeScript function / module
- **保持型メモリ (Retentive Memory)** → Firestore / IndexedDB cache
- **スキャン実行 (Scan Execution)** → Event-driven execution
- **モニタリング (Monitoring)** → Browser DevTools
- **テストモード (Test Mode)** → Console commands
- **フラグ待ち (Flag Waiting)** → async/await
- **型宣言 (Type Declaration)** → TypeScript interfaces

## Special Conventions

### 30-Day Navigation Boundary
- Date navigation is restricted to the last 30 days for data safety
- Implemented in app.ts and week-target.ts

### ISO Week Handling
- Uses ISO 8601 week dates (Monday start, week 1 = first week with Thursday)
- `iso-week.ts` provides utilities: `getISOWeekInfo()`
- Critical for week-based features and data organization

### Backup System
- `backup.ts` wraps `saveDayLog`/`saveWeekTarget` functions
- Automatic backups scheduled to localStorage
- Exposes `window.elvBackup` API for manual backup/restore

## Common Tasks & Patterns

### Adding a New Feature
1. Define types/interfaces in `js/types.ts` if needed
2. Implement logic in appropriate `.ts` file with full type annotations
3. Add unit tests in `test/` directory
4. Run `npm run typecheck` and `npm test` to verify

### Extending Database Schema
1. Update `WeekData` interface in `js/types.ts`
2. Update storage/migration functions as needed
3. Update Firestore security rules if applicable
4. Test migration with existing data

### Adding New Calculations
1. Add typed function to `calculations.ts`
2. Export via ES module `export`
3. Add unit tests in `test/calculations.test.ts`
4. Document any PLC analogies in code comments

## Important Notes

### What NOT to Do
- Do NOT use `new Date("YYYY-MM-DD")` directly (use `parseDateLocal()`)
- Do NOT skip input validation on numeric fields
- Do NOT use `as any` — extend `Window` interface in `js/global.d.ts` instead
- Do NOT place development files in main `js/` directory (use `js/dev/`)
- Do NOT add new dependencies without checking Node.js version requirements

### Best Practices
- Use TypeScript strict mode features (no implicit any, strict null checks)
- Use `Result<T,E>` for operations that can fail
- Wrap all DB operations in try-catch blocks
- Use `date-utils.ts` functions for all date operations
- Follow existing code patterns and conventions
- Write tests for new functionality
- Run `npm run typecheck` and `npm run lint` before committing
- Consider PLC engineer perspective in documentation

## Getting Help

- Review existing code in `js/` directory for patterns
- Check `docs/CODE_WALKTHROUGH.md` for detailed explanations
- See `docs/QUICK_START_FOR_PLC_ENGINEERS.md` for DevTools debugging tips
- Run `npm run docs:todos` to see current TODO items
