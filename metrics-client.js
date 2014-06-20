var Emitter = require('numbat-emitter')
  , os = require('os')
  , metrics

module.exports = function Metrics () {
  // if metrics already defined, just use those
  if (metrics) {
    return metrics
  }

  var config = require("./config.js")
  // define the metrics agent
  if (config && config.metrics) {
    metrics =
    metrics = new EmitterFacade(config.metrics.collectors, config.metrics.prefix)
  } else {
    metrics = { histogram: function() {}, counter: function() {}, close: function() {} }
  }

  return metrics
}

/*
  Since the old web site has a limited lifespan, I'm minimizing disturbance to it
  when I swap out the metrics client. This is a facade that presents the zag agent
  API so none of the callers need to change.
*/

function EmitterFacade(collector, prefix) {
  this.client = Emitter({
    host: collector.host,
    port: collector.port,
    node: os.hostname()
  })
  this.prefix = prefix || 'npm-www'
}

EmitterFacade.prototype.histogram = function(name, value) {
  value = value || 1
  this.client.metric({ name: name, value: value, tags: ['histogram']})
}

EmitterFacade.prototype.counter = function(name, count) {
  count = count || 1
  this.client.metric({ name: name, count: count, tags: ['counter']})
}

EmitterFacade.prototype.close = function() {
  this.client.destroy();
  this.client = null;
}
