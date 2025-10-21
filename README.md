# Character Sheet 🎮

A real-life character sheet application built with React and TypeScript. Create, manage, and export personal development profiles inspired by RPG character sheets.

## Features

- **Multiple Sheets**: Create and manage multiple character sheets
- **Core Attributes**: Track and visualize your core character attributes
- **Focus Areas**: Define and monitor key areas of focus
- **Supporting Practices**: List practices that support your goals
- **Strategy**: Create and manage your personal strategy
- **Edit Mode Toggle**: Switch between edit and view-only modes
- **Import/Export**: Upload JSON sheets or export current sheet as JSON
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (with Bun package manager)

### Installation

```bash
bun install
```

### Development

To run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

To build for production:

```bash
npm run build
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests with Vitest
- `npm run lint` - Lint code with Biome
- `npm run format` - Format code with Biome
- `npm run check` - Run both lint and format checks

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **TanStack Router** - File-based routing
- **TanStack Query** - Server state management
- **Vitest** - Testing framework
- **Biome** - Linting and formatting

## Project Structure

```
src/
├── components/       # React components
├── data/            # Data types and schemas
├── hooks/           # Custom React hooks
├── integrations/    # Third-party integrations
└── routes/          # TanStack Router routes
```

## Data Format

Character sheets are stored as JSON objects with the following structure:

```json
{
  "id": 1,
  "username": "Character Name",
  "age": 30,
  "archetype": "Hero",
  "courseGoal": "Become a leader",
  "whereIAmNow": "Starting point",
  "whereIWantToBe": "End goal",
  "coreAttributes": [],
  "focusAreas": [],
  "supportingPractices": [],
  "strategy": {}
}
```

## Key Components

### Sheet

Main component that manages the character sheet display and all sub-components.

### Header

Displays and edits core character information (name, age, archetype, etc.).

### CoreAttributesChart

Visualizes and manages character attributes.

### FocusAreas

Manages focus areas for personal development.

### SupportingPractices

Lists practices that support character development.

### Strategy

Manages the overall strategy object.

### SheetManagerModal

Allows creating, selecting, deleting, exporting, and uploading sheets. Also toggles edit mode.

## Features in Detail

### Edit Mode

- **Edit Mode ON (🔓)**: Full editing capabilities - add, edit, delete items
- **Edit Mode OFF (🔒)**: View-only mode - read character sheet without modifications

### Import/Export

- **Export**: Download current sheet as JSON file from the Sheet Manager
- **Import**: Upload a previously exported sheet to restore data

## Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.
