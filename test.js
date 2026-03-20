const { greet, add, subtract } = require('./index');
const { capitalize, reverse, isPalindrome } = require('./utils');
const { multiply, divide, factorial, fibonacci } = require('./math');

// Simple test runner
let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    passed++;
    console.log(`  PASS: ${msg}`);
  } else {
    failed++;
    console.log(`  FAIL: ${msg}`);
  }
}

console.log('Running tests...\n');

console.log('index.js:');
assert(greet('World') === 'Hello, World!', 'greet returns greeting');
assert(greet('Johann') === 'Hello, Johann!', 'greet returns greeting for Johann');
assert(add(2, 3) === 5, 'add returns sum');
assert(subtract(5, 3) === 2, 'subtract returns difference');

console.log('\nutils.js:');
assert(capitalize('hello') === 'Hello', 'capitalize works');
assert(reverse('abc') === 'cba', 'reverse works');
assert(isPalindrome('racecar') === true, 'palindrome detection');
assert(isPalindrome('hello') === false, 'non-palindrome detection');

console.log('\nmath.js:');
assert(multiply(3, 4) === 12, 'multiply works');
assert(divide(10, 2) === 5, 'divide works');
assert(factorial(5) === 120, 'factorial works');
assert(fibonacci(10) === 55, 'fibonacci works');

console.log(`\nResults: ${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
