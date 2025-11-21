# TypeScript Playground

A learning project demonstrating various TypeScript concepts and features through practical examples.

## Overview

This project serves as a hands-on playground for exploring TypeScript fundamentals, including type annotations, functions, unions, type aliases, and more. Each file demonstrates specific TypeScript concepts with working examples.

## Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)

## Installation

1. Clone or navigate to this directory
2. Install dependencies:

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm start
```

This will start `lite-server` and open the project in your browser. The compiled JavaScript files will be executed and you can see the output in the browser console.

## Project Structure

### TypeScript Files

#### `basics.ts`
Demonstrates basic TypeScript type annotations:
- Function parameter types (`number`)
- Type inference
- Basic function usage

**Key Concepts:**
- Type annotations for function parameters
- Type checking at compile time

#### `function.ts`
Explores function types and callbacks in TypeScript:
- Function type annotations
- Callback functions with typed parameters
- Function type variables
- Void return types

**Key Concepts:**
- Function types: `(a: number, b: number) => number`
- Callback functions
- Type safety for function assignments

#### `union-alias.ts`
Demonstrates union types and type aliases:
- Union types (`number | string`)
- Type aliases (`type Combinable`)
- Literal types (`'as-number' | 'as-text'`)
- Type guards with `typeof`

**Key Concepts:**
- Union types for flexible type definitions
- Type aliases for reusable type definitions
- Literal types for specific string/number values
- Runtime type checking

#### `unknown-never.ts`
Covers the `unknown` and `never` types:
- `unknown` type for type-safe handling of dynamic values
- Type narrowing with `typeof` checks
- `never` type for functions that never return

**Key Concepts:**
- `unknown` vs `any` - type-safe alternative
- Type narrowing for runtime type checking
- `never` type for functions that throw errors or never complete

#### `objects-enum-array.ts`
Demonstrates complex types:
- Object types with explicit property types
- Enums (`enum Role`)
- Arrays (`string[]`)
- Tuples (`[number, string]`)

**Key Concepts:**
- Object type annotations
- Enums for named constants
- Array types
- Tuples for fixed-length arrays with specific types

### Other Files

- `app.ts` - Empty TypeScript file (placeholder)
- `app.js` - Compiled JavaScript (generated from TypeScript)
- `index.html` - HTML file that loads the compiled JavaScript
- `package.json` - Project dependencies and scripts

## TypeScript Concepts Covered

1. **Basic Types**
   - `number`, `string`, `boolean`
   - Type annotations and inference

2. **Functions**
   - Function parameter types
   - Return types
   - Function types
   - Callbacks

3. **Advanced Types**
   - Union types (`|`)
   - Type aliases (`type`)
   - Literal types
   - `unknown` and `never` types

4. **Complex Types**
   - Objects
   - Arrays
   - Tuples
   - Enums

5. **Type Guards**
   - `typeof` checks
   - Runtime type narrowing

## Compiling TypeScript

To compile TypeScript files manually, you'll need to install TypeScript globally or use npx:

```bash
npx tsc filename.ts
```

Or install TypeScript as a dev dependency:

```bash
npm install --save-dev typescript
```

Then compile:

```bash
npx tsc filename.ts
```

## Notes

- The project uses `lite-server` for local development
- JavaScript files (`.js`) are generated from TypeScript source files
- Check the browser console to see the output of each example
- This is a learning project - feel free to experiment and modify the code!

## License

ISC

