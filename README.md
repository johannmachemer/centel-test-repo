# Centel Test Repo

A purpose-built test repository for validating Centel VCS analytics pipelines. It generates all required VCS event types (commits, pull requests, CI runs, deployments) predictably and reproducibly, providing a stable fixture for pipeline validation, regression detection, and webhook testing.

## Purpose

Real repositories are too noisy for reliable pipeline validation. This repo provides a controlled environment where Centel engineers can:

- Validate analytics pipelines against known ground truth
- Reproduce test scenarios with identical outputs
- Test all four VCS event types in a single artifact
- Detect regressions with ≥90% accuracy

## Project Structure

```
.
├── index.js       # Core functions: greet, add, subtract
├── math.js        # Math utilities: multiply, divide, factorial, fibonacci
├── utils.js       # String utilities: capitalize, reverse, isPalindrome
├── config.js      # Configuration manager with defaults and validation
├── logger.js      # Level-based logger with ISO timestamp formatting
├── cache.js       # TTL-based key-value cache (SimpleCache)
├── queue.js       # FIFO queue data structure
├── errors.js      # Error hierarchy: AppError, NotFoundError, ValidationError
└── test.js        # Built-in test runner (no external dependencies)
```

## Requirements

- **Node.js** v18 or later
- No external dependencies — the library is entirely self-contained

## Setup

Clone the repository and verify the environment:

```bash
git clone <repository-url>
cd <repository-directory>
node --version  # should be v18+
```

No package installation is required.

## Running Tests

```bash
node test.js
```

The test runner prints `PASS` or `FAIL` for each of the 11 assertions across `index.js`, `utils.js`, and `math.js`, then exits with code `0` (all pass) or `1` (any fail).

Example output:

```
Running tests...

index.js:
  PASS: greet returns greeting
  PASS: greet returns greeting for Johann
  PASS: add returns sum

utils.js:
  PASS: capitalize works
  PASS: reverse works
  PASS: palindrome detection
  PASS: non-palindrome detection

math.js:
  PASS: multiply works
  PASS: divide works
  PASS: factorial works
  PASS: fibonacci works

Results: 11 passed, 0 failed
```

## Syntax Validation

```bash
node -c index.js
node -c math.js
node -c utils.js
```

## Usage

All modules use CommonJS (`require`/`module.exports`) and have no side effects at require time.

### Core Functions (`index.js`)

```js
const { greet, add, subtract } = require('./index');

greet('World');       // 'Hello, World!'
add(2, 3);            // 5
subtract(10, 4);      // 6
```

### Math Utilities (`math.js`)

```js
const { multiply, divide, factorial, fibonacci } = require('./math');

multiply(3, 4);       // 12
divide(10, 2);        // 5  — throws Error on division by zero
factorial(5);         // 120 — throws Error on negative input
fibonacci(10);        // 55
```

### String Utilities (`utils.js`)

```js
const { capitalize, reverse, isPalindrome } = require('./utils');

capitalize('hello');       // 'Hello'
reverse('abc');            // 'cba'
isPalindrome('racecar');   // true
isPalindrome('hello');     // false
```

### Configuration (`config.js`)

```js
const { getConfig, validateConfig, defaults } = require('./config');

// Default values: { port: 3000, host: 'localhost', debug: false,
//                   logLevel: 'info', maxRetries: 3, timeout: 5000 }
const cfg = getConfig({ port: 8080, debug: true });
validateConfig(cfg);  // throws on invalid port or timeout
```

### Logger (`logger.js`)

```js
const { Logger } = require('./logger');

const log = new Logger('debug');  // levels: debug, info, warn, error
log.info('Server started');
// [2026-03-20T12:00:00.000Z] [INFO] Server started
```

Messages below the configured level are suppressed.

### Cache (`cache.js`)

```js
const { SimpleCache } = require('./cache');

const cache = new SimpleCache(30000);  // TTL in ms, default 60000
cache.set('key', 'value');
cache.get('key');   // 'value' (or undefined if expired)
cache.has('key');   // true/false
cache.clear();
cache.size;         // number of entries (may include expired entries)
```

Expiry is checked lazily on `get()`.

### Queue (`queue.js`)

```js
const { Queue } = require('./queue');

const q = new Queue();
q.enqueue('a');
q.enqueue('b');
q.peek();     // 'a'
q.dequeue();  // 'a'
q.size;       // 1
q.isEmpty();  // false
```

### Error Handling (`errors.js`)

```js
const { AppError, NotFoundError, ValidationError, handleError } = require('./errors');

throw new NotFoundError('User');          // 404: "User not found"
throw new ValidationError('port', 'must be a number');  // 400

// Normalize any error to { status, message }
handleError(new NotFoundError('Item'));   // { status: 404, message: 'Item not found' }
handleError(new Error('unexpected'));     // { status: 500, message: 'Internal server error' }
```

## CI/CD

The repository includes a GitHub Actions workflow (`.github/workflows/ci.yml`) that runs on every push and pull request to `main`, as well as manual dispatch.

**Jobs (run in parallel):**

| Job | Command | Purpose |
|-----|---------|---------|
| `test` | `node test.js` | Run the test suite |
| `lint` | `node -c index.js && node -c math.js && node -c utils.js` | Validate syntax |

No secrets or external services are required.

## Contributing

1. Fork the repository and create a branch from `main`
2. Make changes — ensure all modules remain dependency-free and side-effect-free at require time
3. Run `node test.js` and verify all tests pass (exit code 0)
4. Run `node -c` on any modified `.js` files
5. Open a pull request against `main`

CI will automatically run tests and lint checks on your PR.
