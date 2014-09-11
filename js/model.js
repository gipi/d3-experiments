// this is the model representing the cuts
define([], function() {
    var LavorazioneBuilder = function(size, weight, dint, dout) {
        if (size === undefined || weight === undefined || dint === undefined || dout === undefined) {
            throw new Error('missing one or more of size, weight, internal and external diameter parameters');
        }

        return {
            size: size,
            weight: weight,
            dint: dint,
            dout: dout,
            tagli: [],
            refiloLeft: 0,// FIXME: make the refilo modifiable
            refiloRight: 0,

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
