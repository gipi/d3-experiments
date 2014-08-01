var assert = require('assert'),
    fact = require('./../functions').fact,
    binomial = require('./../functions').binomial;

test('factorial', function() {
    assert.equal(fact(0), 1);
    assert.equal(fact(1), 1);
    assert.equal(fact(2), 2);
});

test('binomial', function() {
    assert.equal(binomial(0, 0), 1);
    assert.equal(binomial(10, 0), 1);
    assert.equal(binomial(10, 10), 1);
});

test('Binomial distribution', function() {
    b = new BinomialDistribution(1, .5);

    assert.deepEqual(b.getAll(), [.5, 0.5]);
});
