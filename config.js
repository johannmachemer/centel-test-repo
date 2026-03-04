const defaults = {
  port: 3000,
  host: 'localhost',
  debug: false,
  logLevel: 'info',
  maxRetries: 3,
  timeout: 5000,
};

function getConfig(overrides = {}) {
  return { ...defaults, ...overrides };
}

function validateConfig(config) {
  if (typeof config.port !== 'number' || config.port < 0) {
    throw new Error('Invalid port');
  }
  if (typeof config.timeout !== 'number' || config.timeout < 0) {
    throw new Error('Invalid timeout');
  }
  return true;
}

module.exports = { defaults, getConfig, validateConfig };
