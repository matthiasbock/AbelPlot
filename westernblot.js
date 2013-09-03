
/*
 * show a Western Blot with selectable lanes
 */
WesternBlot = function(parent, id, src, lanes) {
    
    var container = $('<div id="'+id+'" class="container">');
    $(parent).append(container);

    var wb = {
            container: container,
            id: id,
            src: src,
            lanes: lanes
    };
    
    wb.container.append( $('<img src="'+src+'">') );
    
    return wb;
};