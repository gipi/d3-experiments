define(function() {
    return {
        fact: function(n) {
            if (n < 0) {
                throw new Error('negative values are not allowed');
            }

            if (n == 0 || n == 1) {
                return 1;
            }

            return n * this.fact(n - 1);
        },

        binomial: function(N, k) {
            return this.fact(N) / (this.fact(N - k) * this.fact(k));
        },

        binomialDistribution: function(N, r, f) {
            return this.binomial(N, r) * Math.pow(f, r) * Math.pow(1 - f, N - r);
        }
    }
});
