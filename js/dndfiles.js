require.config({
  paths: {
    d3: "http://d3js.org/d3.v3.min"
  }
});
require(['d3', 'libs/file', 'libs/matrix'], function(d3, file, matrix) {

    /**
     * When a file is loaded update the frequencies matrix
     */
    var cb = function(data) {
        if (data.byteLength == 0) {
            console.log('empty file');
            return;
        }

        var frequency = {};

        // initialize to zero all the entries
        for (var cycle = 0 ; cycle < 256 ; cycle++) {
            frequency[cycle] = 0;
        }

        var max = 0;
        for (var cycle = 0 ; cycle < data.byteLength ; cycle++) {
            var c = data[cycle];
            if (!frequency.hasOwnProperty(c)) {
                frequency[c] = 0;
            }

            var actual = ++frequency[c];
            max = actual > max ? actual : max;

        }

        console.log(JSON.stringify(frequency));
        // normalize with the max value as full square
        for (var cycle = 0 ; cycle < 256 ; cycle++) {
            frequency[cycle] = Math.sqrt((frequency[cycle] / max) * 400);
        }

        var X = [];
        for (var x = 0 ; x < 16 ; x++) {
            var xs = [];
            for (var y = 0 ; y < 16 ; y++) {
                xs.push(frequency[x * 16 + y]);
            }
            X.push(xs);
        }

        Matrix.update(X);
    };


    new file('files', cb);


    var Matrix = new matrix(d3.select('body'), 16, 16);

});
