## Purpose
Give an AI coding agent the minimal, actionable context to make high-quality code changes in this repo.

## Big picture
- Single-page React + TypeScript site built with Vite. Entrypoint: [index.html](index.html#L1) -> [src/main.tsx](src/main.tsx#L1).
- UI is a small component tree currently implemented mainly in [src/App.tsx](src/App.tsx#L1-L200). Images and static media live in [src/assets](src/assets).
- Styling uses Tailwind; base CSS lives in [src/index.css](src/index.css#L1). Tailwind picks up files defined in [tailwind.config.js](tailwind.config.js#L1).
- Build is two-step: typecheck via `tsc -b` (project refs) then `vite build`. See `package.json` scripts.

## Key files to inspect first
- [package.json](package.json#L1): dev scripts (`dev`, `build`, `preview`, `lint`).
- [vite.config.ts](vite.config.ts#L1): Vite + React plugin.
- [tailwind.config.js](tailwind.config.js#L1): ensure new files are included in `content`.
- [tsconfig.app.json](tsconfig.app.json) and [tsconfig.node.json](tsconfig.node.json): project references used by `tsc -b`.

## Developer workflows (exact commands)
- Start dev server with HMR: `npm run dev` (default port 5173). Use browser devtools for console/HMR messages.
- Build (typecheck first): `npm run build` — runs `tsc -b` then `vite build`.
- Preview production build: `npm run preview`.
- Lint: `npm run lint`.

## Project-specific conventions and patterns
- Keep UI inside `src/` and prefer small, focused components. Current `App.tsx` shows how assets are imported directly: `import face from './assets/myface.png'`.
- Tailwind utility classes are used everywhere; avoid adding global component styles unless necessary—extend `src/index.css` only when required.
- Image assets are referenced by relative import; preserve that pattern for bundler-friendly imports.
- `type: "module"` in `package.json` means ESM imports are used; some files include explicit extensions (e.g. `./App.tsx`) — preserve the project's import style when adding new files.
- The repo runs `tsc -b` before build, so keep `tsconfig` references correct when adding new TS project roots.

## Integration points / external deps
- Runtime: React + ReactDOM. Bundler: Vite with `@vitejs/plugin-react`.
- Styling: TailwindCSS + PostCSS. Ensure new components are matched by `tailwind.config.js`'s `content` globs.

## Common edits you may be asked to do (how to do them here)
- Add a new page/component: create `src/components/<Name>.tsx`, import into `src/App.tsx` or `src/main.tsx` and ensure Tailwind picks it up.
- Add an asset: put it in `src/assets/` and import with a relative path in the TSX file.
- Update styles: modify `src/index.css` for global rules; add utilities in markup for component-level styles.

## Debugging tips
- If changes don't appear, confirm dev server is running (`npm run dev`) and HMR logs show file updates.
- Build failures often come from type errors; run `tsc -b` locally to see diagnostics.

## What not to change without human review
- `package.json` scripts that control build/test flows unless adding a new explicit script.
- `tailwind.config.js` content globs without verifying they include new file paths.
- TypeScript project references in `tsconfig.*.json` — modifying these affects CI and local builds.

## Where to look for more context
- Start at [src/App.tsx](src/App.tsx#L1-L40) to learn UI patterns and state handling.
- Read [README.md](README.md#L1) for general template notes.

If anything in this file is unclear or you want more examples (component patterns, tests, or CI hooks), tell me which area to expand.
