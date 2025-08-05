# Pokédex SPA

A single-page React application for browsing and comparing Pokémon data using the PokéAPI. Built with React, React-Bootstrap, Redux Toolkit, and RTK Query.

## Live Demo

- Production: https://frtvt-pokemon.netlify.app/

## Features

- **Pokémon List** with pagination, search, and page-size selector  
- **Pokémon Details** view with stats, types, and abilities  
- **Comparison**: add up to N Pokémon for side-by-side comparison  
- **Theme toggle** (light/dark) with context  
- **Responsive** layout with React-Bootstrap  
- **Error boundary** and **toasts** for notifications  
- **Unit & integration tests** with Jest and React Testing Library  
- **CI**: GitHub Actions for build, lint, format check, and tests  
- **CD**: Deployed on Netlify

## Getting Started

### Prerequisites

- Node.js ≥ 16  
- npm ≥ 8  

### Installation

```bash
git clone https://github.com/furtivite/pokemons.git
cd pokemons
npm ci
```

### Development

```bash
npm start
```

This runs the app in development mode at http://localhost:3000.

### Build

```bash
npm run build
```

Builds the production bundle into `build/`.

### Testing

- **Run tests**:  
  ```bash
  npm test
  ```
- **Coverage**:  
  ```bash
  npm run test:coverage
  ```

### Lint & Format

- **Lint** with ESLint:  
  ```bash
  npm run lint
  ```
- **Format** with Prettier:  
  ```bash
  npm run format
  ```

## Project Structure

```
src/
├── api/                 # RTK Query services
├── assets/              # static assets (e.g. logo.svg)
├── components/          # reusable UI components
├── features/            # Redux slices & selectors
├── pages/               # page-level components / routes
├── theme/               # ThemeContext & provider
├── store/               # Redux store setup
├── App.tsx              # root component with routing
└── index.tsx            # entry point
```

## CI / CD

### GitHub Actions

- Workflow **CI** runs on pushes & PRs to `main`, doing:
  - Checkout, Node.js setup  
  - `npm ci`  
  - `npm run format -- --check`  
  - `npm run lint`  
  - `npm run test:coverage`  
  - Upload coverage artifact  

### Netlify Deployment

The site is auto-deployed on Netlify from the `main` branch.  
Visit: https://frtvt-pokemon.netlify.app/

## Contributing

1. Fork the repo  
2. Create a feature branch (`git checkout -b feat/your-feature`)  
3. Commit your changes (`git commit -m "feat: ..."`)  
4. Push to your branch (`git push origin feat/your-feature`)  
5. Open a Pull Request

Please follow Conventional Commits and ensure tests pass.

## License

This project is open-source under the MIT License.
