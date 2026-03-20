# Centel Test Repo

A controlled test fixture for validating [Centel](https://centel.io) VCS analytics. This repository provides a predictable, deterministic codebase so Centel engineers can assert correctness of commit tracking, pull request metrics, deployment signals, and CI/CD pipeline data without the noise of production repositories.

## Purpose

Centel ingests GitHub data—commits, pull requests, deployments, and CI/CD workflow runs—and surfaces those signals as engineering metrics. Testing against real-world repos is unreliable because the data is unpredictable. This repo exists as a ground-truth fixture: its history, structure, and test outcomes are known in advance, making it possible to assert that Centel shows exactly what it should.

## Repository Structure

```
.
├── index.js       # Core functions: greet, add, subtract
├── math.js        # Math functions: multiply, divide, factorial, fibonacci
├── utils.js       # String utilities: capitalize, reverse, isPalindrome
├── config.js      # Configuration management: getConfig, validateConfig
├── errors.js      # Error classes: AppError, NotFoundError, ValidationError
├── logger.js      # Leveled logger: Logger class
├── cache.js       # TTL-based in-memory cache: SimpleCache
├── queue.js       # FIFO queue: Queue class
└── test.js        # Test suite (custom runner, no dependencies)
```

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or later

No external dependencies are required. The project uses only Node.js built-ins.

## Setup

```bash
git clone <repository-url>
cd centel-test-repo
```

That's it. There is nothing to install.

## Running Tests

```bash
node test.js
```

Expected output:

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

The process exits with code `0` on success and `1` if any test fails.

## Module Reference

### `index.js` — Core Functions

```js
const { greet, add, subtract } = require('./index');

greet('World');      // 'Hello, World!'
add(2, 3);           // 5
subtract(10, 4);     // 6
```

### `math.js` — Math Functions

```js
const { multiply, divide, factorial, fibonacci } = require('./math');

multiply(3, 4);      // 12
divide(10, 2);       // 5  — throws Error('Division by zero') when divisor is 0
factorial(5);        // 120 — throws Error('Negative input') for n < 0
fibonacci(10);       // 55
```

### `utils.js` — String Utilities

```js
const { capitalize, reverse, isPalindrome } = require('./utils');

capitalize('hello');       // 'Hello'
reverse('abc');            // 'cba'
isPalindrome('racecar');   // true
isPalindrome('hello');     // false
```

### `config.js` — Configuration

```js
const { getConfig, validateConfig, defaults } = require('./config');

const cfg = getConfig({ debug: true });
// { port: 3000, host: 'localhost', debug: true, logLevel: 'info', maxRetries: 3, timeout: 5000 }

validateConfig(cfg); // true — throws Error on invalid port or timeout
```

### `errors.js` — Error Handling

```js
const { AppError, NotFoundError, ValidationError, handleError } = require('./errors');

throw new NotFoundError('User');       // 'User not found', statusCode 404
throw new ValidationError('email', 'invalid format'); // statusCode 400

handleError(err); // { status: number, message: string }
```

### `logger.js` — Logger

```js
const { Logger } = require('./logger');

const log = new Logger('debug'); // levels: debug, info, warn, error
log.info('started');             // [<ISO timestamp>] [INFO] started
```

### `cache.js` — TTL Cache

```js
const { SimpleCache } = require('./cache');

const cache = new SimpleCache(60000); // TTL in ms (default 60s)
cache.set('key', 'value');
cache.get('key');   // 'value' (or undefined if expired)
cache.has('key');   // true / false
cache.clear();
cache.size;         // number of entries
```

### `queue.js` — FIFO Queue

```js
const { Queue } = require('./queue');

const q = new Queue();
q.enqueue('a');
q.enqueue('b');
q.dequeue();   // 'a'
q.peek();      // 'b'
q.size;        // 1
q.isEmpty();   // false
```

## CI / CD

This repository is designed to be used with a CI pipeline that runs `node test.js` on every push and pull request. A passing run (exit code `0`) is the primary signal that Centel should ingest and display as a successful workflow run.

## Contributing

1. Fork the repository and create a branch from `main`.
2. Make your changes—keep functions pure and side-effect free where possible.
3. Ensure `node test.js` exits with code `0` before opening a pull request.
4. Open a pull request against `main` with a clear description of the change.

Changes to this repo are intentional signals for Centel's analytics pipeline. Avoid unplanned or noisy commits; each change should represent a meaningful, traceable event.
