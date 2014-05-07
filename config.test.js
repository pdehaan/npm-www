module.exports = {
  "couchAuth": "admin:admin",
  "registryCouch": "http://localhost:15986/",
  "redis": {
    "host": "127.0.0.1",
    "port": 16377
  },
  "redisAuth": "i-am-using-redis-in-test-mode-for-npm-www-tests",
  "keys": [
    "these keys are for dev mode only"
  ],
  "port": 15443,
  "host": "localhost",
  "httpPort": 15080,
  "npm": {
    "registry": "http://127.0.0.1:15986/",
    "strict-ssl": false,
    "loglevel": "warn",
    "username": "",
    "_password": "",
    "_auth": "",
    "_token": "",
    "cache": {}
  },
  "elasticsearch": {
    "url": "http://127.0.0.1:9200/npm",
    "pageSize": 20
  },
  "downloads": {
    "url": "https://api.npmjs.org/downloads/"
  },
  "metrics": {
    "collectors": [
      "metrics.internal.npmjs.com:8877"
    ],
    "prefix": "npm-www-dev"
  },
  "debug": true
}