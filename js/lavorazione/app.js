require.config({
  paths: {// WITHOUT JS EXTENSION
    d3: "http://d3js.org/d3.v3.min",
    handlebars: '../libs/handlebars'
  }
});

require(['gui', '../model'], function(gui, model) {
    var m = model(1250, 10000, 500, 1000);
    var g = gui('boh', m);
});
