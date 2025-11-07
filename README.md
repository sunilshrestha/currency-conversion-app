# Currency Conversion App

A Angular (v20) single-page application that demonstrates currency conversion features: viewing exchange rates, converting between currencies, and viewing conversion history. The project uses Angular standalone components, lazy-loaded routes, Tailwind CSS for utilities, and Angular Material for UI components.

Why this project is useful
- Quick starter for building currency-related features using Angular v20.
- Demonstrates modern Angular patterns: standalone components, and lazy-loading.
- Uses Tailwind CSS for rapid UI prototyping and Angular Material for accessible UI primitives.

Key features
- Dashboard, Currency Conversion, and Conversion History views (lazy-loaded).
- A Default Layout component that wraps application routes.
- A reusable service with methods to fetch exchange rates, currencies, and historical time series.

Getting started

Prerequisites

- Node.js >= 18
- npm
- Angular CLI (optional but recommended):

```powershell
npm install -g @angular/cli
```

Install

```powershell
npm install
```

Run the app

```powershell
npm start
# or
ng serve
```

Build for production

```powershell
npm run build
```

Project structure (important files)

- `src/app/` — application source
  - `features/` — lazy-loaded page components (dashboard, conversion, history)
  - `shared/ui/layouts/default-layout/` — Default layout component
  - `services/currency-conversion.service.ts` — service with methods to fetch exchange rates and history
- `src/styles.scss` — global styles (imports Tailwind partials and Material theme)

Notes about APIs
- This frontend relies on a separate **.NET Core Web API** backend available here: [Currency Conversion](https://github.com/sunilshrestha/currency-conversion) Repository. To connect the app to the backend, configure the `apiBaseUrl` in the Angular environment files.

How to configure the API base URL
- Open the environment files and set `apiBaseUrl` to the URL where the .NET Core API is hosted:

    If the environment file does not exist, generate it using Angular CLI:
  
  ```powershell
  ng generate environments
  ```

  `src/environments/environment.ts` (production)

  ```ts
  export const environment = {
    production: true,
    apiBaseUrl: 'https://your-production-api.example.com'
  };
  ```

  `src/environments/environment.development.ts` (development)

  ```ts
  export const environment = {
    production: false,
    apiBaseUrl: 'https://localhost:PORT'
  };
  ```

- After changing the environment files, restart the Angular dev server (`npm start` / `ng serve`) so the new values are picked up.

Running the backend
- Clone or obtain the separate [**Currency Conversion**](https://github.com/sunilshrestha/currency-conversion) repo and run it according to its README. Make sure the API is reachable at the URL you configured above.

Notes
- If you prefer to point the frontend directly at a third-party exchange rates provider, update **currency conversion service** and the associated **data models** accordingly. By default this project is wired to call your own backend API.

Where to get help
- Open an issue in this repository for bugs and feature requests.
- Review source files in `src/app/` for implementation details.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
