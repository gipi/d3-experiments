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

        attachFromTemplate(node, 'long-ui', {});

        var buttonNode = document.getElementById('cut-btn');
        var masterNode = document.getElementById('lon-svg');

        function attachCut() {
            attachFromTemplate(node, 'single-cut', {svg: originalSVGNode.outerHTML});
        }

        var originalSVGNode = null,
            longitudinale = null;
        d3.xml("rotolo.svg", "image/svg+xml", function(xml) {
            originalSVGNode = xml.documentElement;

            longitudinale = Lon(originalSVGNode, model);
            longitudinale.attach(masterNode);

            buttonNode.addEventListener('click', function(evt) {
                // do not submit the form
                evt.preventDefault();
                model.add(5, 20);
                longitudinale.update();
                attachCut();
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
