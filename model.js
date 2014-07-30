// this is the model representing the cuts
var LavorazioneBuilder = function(size) {
    if (size === undefined) {
        throw new Error('missing size parameter');
    }

    return {
        size: size,
        tagli: [],
        refiloLeft: 10,
        refiloRight: 20,

        add: function(value, count) {
            if ((value * count) > size) {
                throw new Error('xxx');
            }

            this.tagli.push({"value": value, "count": count});
        },

        setRefiloLeft: function(value) {
            this.refiloLeft = value;
        },

        setRefiloRight: function(value) {
            this.refiloRight = value;
        }
    }
};
