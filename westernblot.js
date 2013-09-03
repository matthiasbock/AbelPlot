
/*
 * show a Western Blot with selectable lanes
 */
WesternBlot = function(parent, id, src, lanes) {
    
    var wb = {
            parent: $(parent),
            id: id,
            src: src,
            lanes: lanes
    };
    
    wb.parent.append( $('<img src="'+src+'">') );
    
    return wb;
};