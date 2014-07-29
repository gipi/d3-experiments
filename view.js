// this is the view
var DiagramBuilder = function (model, svgId, valueId, countId) {
    var Diagram = {
        svg: d3.select(svgId),
        model: model,
        blocks: [],
        offset: 0,

        removeBlock: function(block) {
            block.remove();
        },

        reset: function() {
            this.offset = 0;
            this.blocks.forEach(this.removeBlock);
            this.blocks = [];
        },
        update: function(model) {
            var that = this;
            model.tagli.forEach(function(item) {
                that.add(item.value, item.count);
            });
        },

        add: function(value, count) {
            function highlight() {
                d3.select(this).attr('fill', 'rgba(0, 0, 255, 1)')
            }

            function dehighlight() {
                d3.select(this).attr('fill', 'rgba(0, 0, 255, 0.75)')
            }

            var real_width = value * count;

            // this is the main block
            var block = this.svg.append('g');
            block.append('rect')
                .attr('class', 'taglio')
                .attr('width', real_width)
                .attr('height', 240)
                .attr('fill', 'rgba(0, 0, 255, 0.75)')
                .attr('stroke', 'rgba(0,0,0,.5)')
                .attr('x', this.offset)
                .attr('y', 0)
                .on('mouseover', highlight)
                .on('mouseout', dehighlight)
                    ;

            // this is the closure button
            block.append('rect')
                .attr('class', 'btn-taglio')
                .attr('width', 20)
                .attr('height', 20)
                .attr('fill', 'rgba(255, 0, 0, 1)')
                .attr('x', this.offset + real_width - 25)
                .attr('y', 5)
                    ;
            this.offset += real_width;
            this.blocks.push(block);
        }
    }
    d3.select('#do').on('click', function() {
        var value = d3.select(valueId)[0][0].value;
        var count = d3.select(countId)[0][0].value;

        Diagram.add(value, count);
    });

    return Diagram;
};
