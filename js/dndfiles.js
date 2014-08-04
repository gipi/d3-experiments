require(['libs/file'], function(file) {
    var frequency = {};

    var cb = function(data) {
        for (var cycle = 0 ; cycle < data.byteLength ; cycle++) {
            var c = data[cycle];
            if (!frequency.hasOwnProperty(c)) {
                frequency[c] = 0;
            }

            frequency[c]++;
        }

        console.log(JSON.stringify(frequency));
    };

    new file('files', cb);
});
