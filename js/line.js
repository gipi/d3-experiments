require.config({
  paths: {
    d3: "http://d3js.org/d3.v3.min"
  }
});

require(['libs/line'], function(line) {
    data = [
        {'x': 0, 'y': 1},
        {'x': 1, 'y': 2},
        {'x': 2, 'y': 2},
        {'x': 4, 'y': 3},
    ];
    new line(data);
});
