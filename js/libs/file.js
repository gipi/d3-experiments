define([], function() {
    return function(selector, callback) {
        function handleFileSelect(evt) {
            var files = evt.target.files; // FileList object

            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {

                var reader = new FileReader();

                // Closure to capture the file information.
                reader.onload = (function(theFile) {
                    return function(e) {
                        var raw = e.target.result;
                        // https://developer.mozilla.org/en/JavaScript_typed_arrays
                        var rawBytes = new Uint8Array(raw);

                        callback(rawBytes);
                    };
                })(f);

                // Read in the image file as a data URL.
                reader.readAsArrayBuffer(f);
            }
        }

        document.getElementById(selector).addEventListener('change', handleFileSelect, false);
    };
});
