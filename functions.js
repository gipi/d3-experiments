function fact(n) {
    if (n < 0) {
        throw new Error('negative values are not allowed');
    }

    if (n == 0 || n == 1) {
        return 1;
    }

    return n * fact(n - 1);
}

function binomial(N, k) {
    return fact(N) / (fact(N - k) * fact(k));
}

function binomialDistribution(N, r, f) {
    return binomial(N, r) * Math.pow(f, r) * Math.pow(1 - f, N - r);
}

BinomialDistribution = function(N, f) {

    return {
        N: N,
        f: f,
        get: function(r) {
            return binomialDistribution(this.N, r, this.f);
        },
        getAll: function() {
            var values = [];
            for (index = 0 ; index <= this.N ; index++) {
                values.push(this.get(index));
            }

            return values;
        }
    }
}


module.exports.fact = fact;
module.exports.binomial = binomial;
module.exports.BinomialDistribution = BinomialDistribution;
