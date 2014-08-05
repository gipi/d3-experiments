define(["d3"], function(d3) {
    return function(el, cols, rows) {
        var m = {
            el: el,
            cols: cols,
            rows: rows,
            max: 20,
            data: null,
            svg: null,

            init: function() {
                this.svg = el.append('svg');
            },

            // matrix -> array
            adapter: function(data) {
                var objs = [];

                for (var x = 0 ; x < this.cols ; x++) {
                    for (var y = 0 ; y < this.rows ; y++) {
                        objs.push({'x': x, 'y': y, 'value': data[x][y]});
                    }
                }

                return objs;
            },

            setData: function(data) {
                this.data = this.adapter(data);
            },

            // take a matrix as argument
            update: function(data) {
                this.setData(data);

                var that = this;
                var cx = function(d) {
                    return d.x * that.max + ((that.max - d.value) / 2);
                };

                this.svg.selectAll('rect')
                    .data(this.data)
                        .enter().append('rect')
                        ;
                this.svg.selectAll('rect')
                    .data(this.data)
                    .attr('x', cx)
                    .attr('y', function(d) { return d.y * that.max + ((that.max - d.value) / 2); })
                    .attr('width', function(d) { return d.value; })
                    .attr('height', function(d) { return d.value; })
                    .attr('fill', 'rgba(0, 0, 0, 1)')
                                ;
            }
        }
        m.init();

        return m;
    };

});
