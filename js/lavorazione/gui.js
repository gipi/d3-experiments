define(['handlebars', 'd3', 'longitudinale'], function(_, d3, Lon) {
    
   // here we create the controller of all the elements
   // primarly the "cut" button -> model -> model view
   var GUI = function(id, model) {
       // attach the DOM for the interface
        var node = document.getElementById(id);

        var masterNode = document.createElement('div');
        masterNode.setAttribute('id', 'master');
        node.appendChild(masterNode);
        masterNode.setAttribute('class', 'col-sm-12');

        var buttonNode = document.createElement('button');
        masterNode.appendChild(buttonNode);
        buttonNode.setAttribute('class', 'btn btn-success');
        buttonNode.innerHTML = 'taglia!!!';

        function attachCut() {
            var source = document.getElementById('single-cut').innerHTML;
            var template = _.compile(source);
            var context = {svg: originalSVGNode.outerHTML};
            var html = template(context);

            var div = document.createElement('div');
            div.innerHTML = html;

            masterNode.appendChild(div);
        }

        var originalSVGNode = null,
            longitudinale = null;
        d3.xml("rotolo.svg", "image/svg+xml", function(xml) {
            originalSVGNode = xml.documentElement;

            longitudinale = Lon(originalSVGNode, model);
            longitudinale.attach(masterNode);

            buttonNode.addEventListener('click', function() {
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
