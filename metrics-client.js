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
    metrics = new EmitterFacade(config.metrics.collector, config.metrics.prefix)
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
  this.client = new Emitter({
    host: collector.host,
    port: collector.port,
    node: os.hostname()
  })
  this.prefix = prefix || 'npm-www'
}

EmitterFacade.prototype.makePoint = function(name) {

  var details
  var pieces = name.split('>')
  if (pieces.length > 0) {
    name = pieces.shift()
    details = pieces.join('>')
  }
  var result = {
    app: this.prefix,
    name: name
  }
  if (details) result.details = details

  return result
}

EmitterFacade.prototype.histogram = function(name, value) {
  value = value || 1
  var point = this.makePoint(name)
  point.value = value

  this.client.metric(point)
}

EmitterFacade.prototype.counter = function(name, count) {
  count = count || 1
  var point = this.makePoint(name)
  point.count = count
  this.client.metric(point)
}

EmitterFacade.prototype.close = function() {
  this.client.destroy();
  this.client = null;
}
