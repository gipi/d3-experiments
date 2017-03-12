require.config({
  paths: {
    d3: "https://d3js.org/d3.v3.min"
  }
});

require(["d3"], function(d3) {
  console.log(d3.version);
});
