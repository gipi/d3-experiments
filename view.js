// this is the view
var DiagramBuilder = function (model, svgSelector, valueSelector, countSelector, summarySelector, messageSelector) {
    var Diagram = {
        svg: d3.select(svgSelector),
        summary: d3.select(summarySelector),
        message: d3.select(messageSelector),
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
            this.summary[0][0].textContent = '';
            this.message[0][0].textContent = '';
        },
        update: function() {
            var that = this;
            this.model.tagli.forEach(function(item) {
                that.add(item.value, item.count);
            });
        },

        add: function(value, count) {
            function highlight() {
                d3.select(this)
                    .style('opacity', 1)
                    ;
            }

            function dehighlight() {
                var dis = d3.select(this);
                dis.style('opacity', .5);
            }

            var real_width = value * count;

            // this is the main block
            var block = this.svg.append('g')
                .style('opacity', .5)
                .on('mouseover', highlight)
                .on('mouseout', dehighlight)
                    ;
            block.append('rect')
                .attr('class', 'taglio')
                .attr('width', real_width)
                .attr('height', 240)
                .attr('fill', 'rgba(0, 0, 255, 0.75)')
                .attr('stroke', 'rgba(0,0,0,.5)')
                .attr('x', this.offset)
                .attr('y', 0)
                    ;

            this.offset += real_width;
            this.blocks.push(block);

            // add voice to the summary
            this.summary.append('li')
                    .text(count +'x' + value)
                    ;
        }
    }
    d3.select('#do').on('click', function() {
        var valueInput = d3.select(valueSelector)[0][0];
        var countInput = d3.select(countSelector)[0][0];
        var value = valueInput.value;
        var count = countInput.value;

        Diagram.add(value, count);

        valueInput.value = "";
        countInput.value = "";
    });

    return Diagram;
};
