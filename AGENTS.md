# Agent Guidelines for csheet

## Build & Development

**Dev server:** `npm run dev` (runs on port 3000)  
**Build:** `npm run build`  
**Test:** `npm run test` (Vitest)  
**Single test:** `npm run test -- --run src/path/to/file.test.ts`

## Code Quality

**Lint:** `npm run lint` (Biome - fixes imports automatically)  
**Format:** `npm run format` (Biome - uses tabs, double quotes)  
**Check all:** `npm run check`

## Code Style Guidelines

**Imports:** Use relative paths with `@/*` alias (e.g., `@/components/Header`). Always organize imports alphabetically; Biome's `organizeImports` runs automatically.

**Types & Typing:** Full strict TypeScript mode enabled. Use `type` keyword for type definitions. Import React types explicitly (`import type React from "react"`). Props interfaces use `PascalCase` with `Props` suffix. All function parameters should be typed.

**Formatting:** Tab indentation. Double quotes for strings. Components use named exports with `export default` pattern (e.g., `const Header: React.FC<HeaderProps> = (...) => {...}`).

**Naming:** Components: PascalCase (e.g., `Header.tsx`). Hooks: camelCase with `use` prefix (e.g., `use-sheet.ts`). Constants: UPPER_SNAKE_CASE. Functions: camelCase.

**Error Handling:** Use try/catch for async operations. Throw descriptive errors with context (e.g., `throw new Error("Sheet with ID ${id} not found")`). Handle mutations with React Query's `onSuccess`/`onError`.

**Patterns:** Prefer React Query mutations for state changes. Use Tailwind CSS utility classes. Component props are destructured. Avoid prop drilling; use hooks for shared state.

**No unused variables:** TypeScript strict mode enforces `noUnusedLocals` and `noUnusedParameters`.
