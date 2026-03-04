const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };

class Logger {
  constructor(level = 'info') {
    this.level = LOG_LEVELS[level] ?? 1;
  }

  log(level, message) {
    if (LOG_LEVELS[level] >= this.level) {
      const ts = new Date().toISOString();
      console.log(`[${ts}] [${level.toUpperCase()}] ${message}`);
    }
  }

  debug(msg) { this.log('debug', msg); }
  info(msg) { this.log('info', msg); }
  warn(msg) { this.log('warn', msg); }
  error(msg) { this.log('error', msg); }
}

module.exports = { Logger, LOG_LEVELS };
