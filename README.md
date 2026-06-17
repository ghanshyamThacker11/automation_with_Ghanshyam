# BDD Automation Testing

Simple BDD structured automation testing with Playwright and Cucumber.

## Project Structure

```
.
├── src/
│   ├── config/
│   │   └── constants.ts          # Test data and configuration
│   └── pages/
│       ├── BasePage.ts           # Base class for all pages
│       ├── LoginPage.ts          # Login page object
│       ├── ProductPage.ts        # Product page object
│       ├── CartPage.ts           # Cart page object
│       └── CheckoutPage.ts       # Checkout page object
├── tests/
│   ├── features/                 # Cucumber feature files
│   │   ├── login.feature
│   │   └── product.feature
│   ├── step-definitions/         # Cucumber step implementations
│   │   ├── loginSteps.ts
│   │   └── productSteps.ts
│   └── specs/                    # Playwright test specs
│       ├── auth.spec.ts
│       └── product.spec.ts
├── data/
│   └── storageState.json         # Saved session storage
├── package.json
├── playwright.config.json
├── cucumber.js
└── tsconfig.json
```

## Installation

```bash
npm install
```

## Running Tests

### Playwright Tests
```bash
npm test                          # Run all tests
npm run test:headed              # Run with browser visible
npm run test:debug               # Debug mode
npm run test:ui                  # UI mode
```

### Cucumber/BDD Tests
```bash
npm run bdd
```

## Test Files

- **Page Objects** (`src/pages/`) - Encapsulate UI interactions for each page
- **Feature Files** (`tests/features/`) - Gherkin syntax for readable scenarios
- **Step Definitions** (`tests/step-definitions/`) - Implementation of BDD steps
- **Specs** (`tests/specs/`) - Direct Playwright test specs
- **Constants** (`src/config/`) - Centralized test data

## Adding New Tests

1. Create a feature file in `tests/features/`
2. Create page object in `src/pages/` if needed
3. Implement step definitions or specs
4. Add test data to `src/config/constants.ts`

## Notes

- All page interactions are abstracted in page objects for maintainability
- Test data is centralized in constants
- Simple folder structure for easy navigation
- Both Cucumber BDD and Playwright test options available
