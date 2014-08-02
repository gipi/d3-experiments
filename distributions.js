define(['./combinatorial'], function(combinatorial) {
    return {
        BinomialDistribution: function(N, f) {
            if (N < 0 || !combinatorial.isInteger(N)) {
                throw new Error('N must be positive integer');
            }

            if (f < 0 || f > 1.0) {
                throw new Error('f must be positive and not exceed 1.0');
            }

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
