/*
 * Create experiment chooser
 * with one checkbox button per experiment and
 * two rows, one for the left and one for the right plot
 */

createMenu = function(table, takeStrainTitlesFrom) {
    var header = $('<tr>');
    header.append($('<th>').append('Plot color'))
          .append($('<th>').append('Strain'))
          .append($('<th>').append('Concentration'))
          .append($('<th>').append('Phosphorylation'));
    $(table).append(header);
    
    // extract column titles from tsv data in #takeStrainTitlesFrom
    var titles = $(takeStrainTitlesFrom).html().split('\n')[1].split('\t');
    
    for (var i=1; i<=16; i++) {
        var tr = $('<tr>').attr('class', 'hover');
        
        tr.append($('<td>').append($('<input>').attr('class','color {pickerPosition:"right"}')));
        tr.append($('<td>').attr('class', 'title').append(titles[i]));
        
        var input = $('<input>')
            .attr('type', 'checkbox')
            .attr('name', 'checkboxLeft')
            .attr('id', 'checkboxLeft'+("0"+i).slice(-2))
            .bind('click', clickCheckbox);
        tr.append($('<td>').attr('class', 'checkbox').append(input));
        
        var input = $('<input>')
            .attr('type', 'checkbox')
            .attr('name', 'checkboxRight')
            .attr('id', 'checkboxRight'+("0"+i).slice(-2))
            .bind('click', clickCheckbox);
        tr.append($('<td>').attr('class', 'checkbox').append(input));
        
        $(table).append(tr);
    }

    checkCheckboxs();
};

/*
 * Handle checkbox click
 */
experimentLeft = -1;
experimentRight = -1;

clickCheckbox = function(event) {
    var id = event.target.id;
    var plotNr = parseInt(id.substring(id.length-2));
    if (id.indexOf('Left') > -1)
        var g = chart1.plot[plotNr];
    else
        var g = chart2.plot[plotNr];
    if (event.target.checked == true)
        g.attr('style', 'visibility:visible;');
    else
        g.attr('style', 'visibility:hidden;');
};

checkCheckboxs = function() {
    for (var i=1; i<=16; i++) {
        document.getElementById("checkboxLeft"+("0"+i).slice(-2)).checked = (i==experimentLeft);
        document.getElementById("checkboxRight"+("0"+i).slice(-2)).checked = (i==experimentRight);
    }
};
