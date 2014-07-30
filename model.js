// this is the model representing the cuts
var LavorazioneBuilder = function(size) {
    if (size === undefined) {
        throw new Error('missing size parameter');
    }

    return {
        size: size,
        tagli: [],

        add: function(value, count) {
            if ((value * count) > size) {
                throw new Error('xxx');
            }

            this.tagli.push({"value": value, "count": count});
        }
    }
};
