define(['./combinatorial'], function(combinatorial) {
    return {
        BinomialDistribution: function(N, f) {
            return {
                N: N,
                f: f,
                get: function(r) {
                    return combinatorial.binomialDistribution(this.N, r, this.f);
                },
                getAll: function() {
                    var values = [];
                    for (index = 0 ; index <= this.N ; index++) {
                        values.push({'r': index, 'frequency': this.get(index)});
                    }

                    return values;
                }
            }
        }
    }
});
