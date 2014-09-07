// this is the model representing the cuts
define([], function() {
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
                if (isNaN(+value) || isNaN(+count) || +value <= 0 || +count <= 0) {
                    throw new Error('Inserisci dei valori numerici sensati');
                }

                var available = this.available();
                if ((value * count) > available) {
                    throw new Error('Non abbastanza spazio disponibile per questo taglio (' + available + ')');
                }

                this.tagli.push({"value": value, "count": count});
            },

            setRefiloLeft: function(value) {
                this.refiloLeft = value;
            },

            setRefiloRight: function(value) {
                this.refiloRight = value;
            },

            updateTaglio: function(index, obj) {
                // save here just in case the new values are wrong
                var old = this.tagli[index];
                this.tagli[index] = obj;

                if (this.available() < 0) {
                    this.tagli[index] = old;
                    throw new Error('non c\'è più spazio disponibile');
                }
            }
        };
    };
    return LavorazioneBuilder
});
