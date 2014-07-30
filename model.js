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

        available: function() {
            var size = this.size;

            this.tagli.forEach(function(s) {
                size -= (s.value * s.count);
            });

            size -= this.refiloLeft;
            size -= this.refiloRight;

            return size;
        },

        add: function(value, count) {
            if ((value * count) > this.available()) {
                throw new Error('Non abbastanza spazio disponibile per questo taglio');
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
