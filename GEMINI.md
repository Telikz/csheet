# GEMINI.md

## Project Overview

This is a modern React application built with the TanStack ecosystem. It uses Vite for building, Bun as the package manager, and Tailwind CSS for styling. The project is structured around TanStack Router, with file-based routing. TanStack Query is used for data fetching, and the project is set up with TanStack Devtools for debugging.

## Building and Running

### Development

To run the application in development mode:

```bash
bun install
bun --bun run dev
```

This will start the development server on `http://localhost:3000`.

### Building for Production

To build the application for production:

```bash
bun --bun run build
```

### Testing

To run the tests:

```bash
bun --bun run test
```

## Development Conventions

*   **Routing:** The project uses TanStack Router with file-based routing. Routes are managed as files in the `src/routes` directory. The root layout is defined in `src/routes/__root.tsx`.
*   **Data Fetching:** TanStack Query is used for data fetching.
*   **Styling:** Tailwind CSS is used for styling.
*   **Linting and Formatting:** The project uses Biome for linting and formatting. The following scripts are available:
    *   `bun --bun run lint`
    *   `bun --bun run format`
    *   `bun --bun run check`
