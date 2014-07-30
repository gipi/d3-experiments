// this is the view
var DiagramBuilder = function (model, svgSelector, valueSelector, countSelector, summarySelector, messageSelector) {
    var Diagram = {
        height: 240,
        width: 550,
        svg: d3.select(svgSelector),
        summary: d3.select(summarySelector),
        message: d3.select(messageSelector),
        model: model,
        blocks: [],
        offset: 0,
        rightOffset: 0,

        removeBlock: function(block) {
            block.remove();
        },

        reset: function() {
            this.offset = 0;
            this.rightOffset = 0;
            this.blocks.forEach(this.removeBlock);
            this.blocks = [];
            this.summary[0][0].textContent = '';
            this.message[0][0].textContent = '';
        },
        update: function() {
            this.addLeft(this.model.refiloLeft, 1);

            var that = this;

            this.model.tagli.forEach(function(item) {
                that.addLeft(item.value, item.count);
            });
            this.addRight(this.model.refiloRight, 1);
        },

        _buildBlock: function(x, width) {
            function highlight() {
                d3.select(this)
                    .style('opacity', 1)
                    ;
            }

            function dehighlight() {
                var dis = d3.select(this)
                    .style('opacity', .5)
                    ;
            }

            // this is the main block
            var block = this.svg.append('g')
                .style('opacity', .5)
                .on('mouseover', highlight)
                .on('mouseout', dehighlight)
                    ;
            block.append('rect')
                .attr('class', 'taglio')
                .attr('width', width)
                .attr('height', this.height)
                .attr('fill', 'rgba(0, 0, 255, 0.75)')
                .attr('stroke', 'rgba(0,0,0,.5)')
                .attr('x', x)
                .attr('y', 0)
                    ;

            return block;
        },

        addBlock: function(value, count, direction) {
            if (direction === undefined) {
                throw new Error('direction not defined');
            }

            var real_width = value * count;

            var x;
            if (direction == 'left') {
                x = this.offset;
                this.offset += real_width;
            } else {
                x = this.width - this.rightOffset - real_width,
                this.rightOffset += real_width;
            }

            this.blocks.push(this._buildBlock(x,real_width));

            // add voice to the summary
            this.summary.append('li')
                    .text(count +'x' + value)
                    ;
        },

        addLeft: function(value, count) {
            this.addBlock(value, count, 'left');
        },
        addRight: function(value, count) {
            this.addBlock(value, count, 'right');
        },
        append: function(value, count) {
            try {
                Diagram.model.add(value, count);
                Diagram.reset();
                Diagram.update();
            } catch(e) {
                this.message[0][0].textContent = 'Error: ' + e.message;
            }
        }
    }
    d3.select('#do').on('click', function() {
        var valueInput = d3.select(valueSelector)[0][0];
        var countInput = d3.select(countSelector)[0][0];
        var value = valueInput.value;
        var count = countInput.value;

        Diagram.append(value, count);

        valueInput.value = "";
        countInput.value = "";
    });

    return Diagram;
};
