# centel-test-repo

A JavaScript utility library providing math operations, string utilities, configuration management, structured logging, error handling, and a queue data structure.

## Modules

### index.js

Core functions for greetings and basic arithmetic.

- `greet(name)` — Returns a greeting string (`"Hello, <name>!"`)
- `add(a, b)` — Returns the sum of two numbers
- `subtract(a, b)` — Returns the difference of two numbers

### math.js

Advanced math functions.

- `multiply(a, b)` — Returns the product of two numbers
- `divide(a, b)` — Returns the quotient (throws on division by zero)
- `factorial(n)` — Returns the factorial of a non-negative integer
- `fibonacci(n)` — Returns the nth Fibonacci number

### utils.js

String manipulation utilities.

- `capitalize(str)` — Capitalizes the first character of a string
- `reverse(str)` — Reverses a string
- `isPalindrome(str)` — Checks if a string is a palindrome (case-insensitive, ignoring non-alpha characters)

### config.js

Configuration management with defaults and validation.

- `defaults` — Default configuration object (`port`, `host`, `debug`, `logLevel`, `maxRetries`, `timeout`)
- `getConfig(overrides)` — Merges overrides into the default configuration
- `validateConfig(config)` — Validates that `port` and `timeout` are non-negative numbers

### logger.js

Structured logging with configurable log levels.

- `LOG_LEVELS` — Level map: `debug` (0), `info` (1), `warn` (2), `error` (3)
- `Logger` class
  - `new Logger(level)` — Creates a logger with the given minimum level (default: `'info'`)
  - `debug(msg)`, `info(msg)`, `warn(msg)`, `error(msg)` — Log at the respective level

### errors.js

Custom error classes and an error handler.

- `AppError(message, statusCode)` — Base application error (default status 500)
- `NotFoundError(resource)` — 404 error for missing resources
- `ValidationError(field, reason)` — 400 error for validation failures
- `handleError(err)` — Returns `{ status, message }` for any error

### queue.js

A simple FIFO queue.

- `Queue` class
  - `enqueue(item)` — Add an item to the back
  - `dequeue()` — Remove and return the front item
  - `peek()` — Return the front item without removing it
  - `size` — Number of items in the queue
  - `isEmpty()` — Whether the queue is empty

## Usage

```js
const { greet, add, subtract } = require('./index');
const { multiply, factorial } = require('./math');
const { capitalize, isPalindrome } = require('./utils');
const { getConfig, validateConfig } = require('./config');
const { Logger } = require('./logger');
const { AppError, NotFoundError, handleError } = require('./errors');
const { Queue } = require('./queue');

greet('World');           // "Hello, World!"
add(2, 3);               // 5
multiply(3, 4);           // 12
factorial(5);             // 120
capitalize('hello');      // "Hello"
isPalindrome('racecar');  // true

const config = getConfig({ port: 8080 });
validateConfig(config);   // true

const logger = new Logger('debug');
logger.info('Server started');

const err = new NotFoundError('User');
handleError(err);         // { status: 404, message: "User not found" }

const q = new Queue();
q.enqueue('task-1');
q.dequeue();              // "task-1"
```

## Running Tests

```bash
node test.js
```

Hello Johann
