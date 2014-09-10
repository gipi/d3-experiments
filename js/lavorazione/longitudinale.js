define([], function() {
   // the model will contain the real width of the object
   var Lon = function(svg, model) {
       var svgNode = svg.cloneNode(true);
        return {
            svg: svgNode,
            d3Svg: d3.select(svgNode),
            parent: null,
            model: model,
            _offset: 0,
            _geometric_size: 224,

            // update the view with the data inside the model
            update: function() {
                // clean the cuts
                this.d3Svg.select('#cut-container').selectAll('g').remove();

                this._offset = 0;

                // redo the cuts
                for (var count = 0 ; count < this.model.tagli.length ; count++) {
                    var cut = this.model.tagli[count];
                    var width = cut.count * cut.value;

                    // switch from real units (mm?) to geometric units
                    // geometric_width/width : _geometric_size/model.size
                    var geometric_width = (this._geometric_size/this.model.size) * width;

                    this.addCut(count, this._offset, geometric_width);

                    this._offset += geometric_width;
                }
            },

            // add a visualization of a single cut (args in geometric units)
            addCut: function(cutId, offset, width) {
                var g = this.d3Svg.select('#cut-container').insert('g', ':first-child')
                    .attr('id', 'cut-' + cutId)
                    .attr('transform', 'translate(' + offset + ')')
                    .on('mouseover', function() {
                        console.log('on cut ' + cutId);
                        this.style.opacity = .5;
                    }).on('mouseout', function() {
                        this.style.opacity = 1.0
                    });

                g.append('path')
                    .attr('d', 'm 0,141.02697 c 50.40487,0 50.40487,-140.66477906 0,-140.66477906 l '+ width + ',0 c 50.40487,0 50.40487,140.66477906 0,140.66477906 z')
                        ;
            },
            attach: function(parentNode) {
                parentNode.appendChild(this.svg);
                this.parent = parentNode;
            }
        };
   };

   return Lon;
});
