require.config({
  paths: {
    d3: "http://d3js.org/d3.v3.min"
  }
});

require(['d3', '../distributions'], function(d3, probability) {
    var parameter = {'N': 5, 'f': .1};
    var constructor = probability.BinomialDistribution;
    var opts = {
        'N': ':input',
        'f': ':input'
    };

    data = []

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(data.map(function(d) { return d.r; }))
        ;

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, 1])
        ;

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var svgXAxis = svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

    var svgYAxis = svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");

    // attach callback to the editing of the inputs
    for (var k in opts) {
        var callback = function(l) {
            return function() {
                parameter[l] = +this.value;

                data = new constructor(parameter['N'], parameter['f']).getAll();
                console.log(JSON.stringify(data));
                updateGraph();
            };
        };

        d3.select('#' + k).on('input', callback(k));
    }

    /**
     * Draw the bar graph using the data in the array.
     */
    function updateGraph() {
        x.domain(data.map(function(d) { return d.r; }));
        y.domain([0, d3.max(data, function(d) {return d.frequency;})]);

        svg.select('g.y.axis')
            .call(yAxis)
            .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");
        svgXAxis.call(xAxis);

        console.log('range band: ' + x.rangeBand());

        var graph = svg.selectAll(".bar")
            .data(data);

        graph.exit().remove();

        graph
            .enter().append("rect")
              .attr("class", "bar")
              ;

        graph
              .attr("x", function(d) { return x(d.r); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.frequency); })
              .attr("height", function(d) { return height - y(d.frequency); })
              ;
    }

    updateGraph();
});
