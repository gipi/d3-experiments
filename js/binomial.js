require.config({
  paths: {
    d3: "https://d3js.org/d3.v3.min"
  }
});

require(['d3', '../distributions', '../chart'], function(d3, probability, chart) {
    var constructor = function(_opts) {
        return new probability.BinomialDistribution(_opts['N'], _opts['f']);
    };

    var opts = {
        'N': 2,
        'f': .5
    };

    var Chart = new chart(opts, constructor).updateChart();
});
