// this is the model representing the cuts
var LavorazioneBuilder = function() {
    return {
        tagli: [],

        add: function(value, count) {
            this.tagli.push({"value": value, "count": count});
        }
    }
};
