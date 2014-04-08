var ZagAgent = require('zag-agent')
  , metrics

module.exports = function Metrics () {
  // if metrics already defined, just use those
  if (metrics) {
    return metrics
  }

  var config = require("./config.js")
  // define the metrics agent
  if (config && config.metrics) {
    metrics = ZagAgent(config.metrics.collectors).scope(config.metrics.prefix)
  } else {
    metrics = { histogram: function() {}, counter: function() {}, close: function() {} }
  }

  return metrics
}


