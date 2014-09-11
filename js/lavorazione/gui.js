define(['handlebars', 'd3', 'longitudinale'], function(_, d3, Lon) {
    
    function attachFromTemplate(parent, templateID, context) {
        var source = document.getElementById(templateID).innerHTML;
        var template = _.compile(source);
        var html = template(context);

        parent.insertAdjacentHTML('beforeend', html);
    }

   // here we create the controller of all the elements
   // primarly the "cut" button -> model -> model view
   var GUI = function(id, model) {
       // attach the DOM for the interface
        var node = document.getElementById(id);

        attachFromTemplate(node, 'long-ui', {
            dint: model.dint,
            dout: model.dout,
            weight: model.weight,
            width: model.size
        });

        var buttonNode = document.getElementById('cut-btn');
        var masterNode = document.getElementById('lon-svg');

        function attachCutUI(n, larghezza, weight) {
            attachFromTemplate(node, 'single-cut', {n: n, larghezza: larghezza, weight: weight});
        }

        var originalSVGNode = null,
            longitudinale = null;
        d3.xml("rotolo.svg", "image/svg+xml", function(xml) {
            originalSVGNode = xml.documentElement;

            longitudinale = Lon(originalSVGNode, model);
            longitudinale.attach(masterNode);

            buttonNode.addEventListener('click', function(evt) {
                var nTagliNode = document.getElementById('nTagli');
                var larghezzaTagliNode = document.getElementById('larghezzaTagli');

                var n = +nTagliNode.value;
                var larghezza = +larghezzaTagliNode.value;
                var peso = model.weight * ((larghezza * n) / model.size);

                // do not submit the form
                evt.preventDefault();
                model.add(n, larghezza);
                longitudinale.update();
                attachCutUI(n, larghezza, peso);
            });

        });
       return {
           parentNode: node,
           masterNode: masterNode,
           longitudinale: longitudinale,
           model: model

       };
   };

   return GUI;
});
