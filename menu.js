/*
 * Create experiment chooser
 * with one radio button per experiment and
 * two rows, one for the left and one for the right plot
 */

createMenu = function(table, takeStrainTitlesFrom) {
    var header = $('<tr>');
    header.append($('<th>').append('Plot color'));
    header.append($('<th>').append('Strain'));
    header.append($('<th>').append('Concentration'));
    header.append($('<th>').append('Phosphorylation'));
    $(table).append(header);
    
    // extract column titles from tsv data in #takeStrainTitlesFrom
    var titles = $(takeStrainTitlesFrom).html().split('\n')[1].split('\t');
    
    for (var i=1; i<=16; i++) {
        var tr = $('<tr>').attr('class', 'hover');

        tr.append($('<td>').append($('<input>').attr('class','color {pickerPosition:"right"}')));
        tr.append($('<td>').attr('class', 'title').append(titles[i]));
        
        var input = $('<input>').attr('type', 'checkbox').attr('name', 'radioLeft').attr('id', 'radioLeft'+("0"+i).slice(-2));
        input.bind('click', clickRadio);
        input.bind('mousewheel', wheelRadio);
        tr.append($('<td>').attr('class', 'checkbox').append(input));

        var input = $('<input>').attr('type', 'checkbox').attr('name', 'radioRight').attr('id', 'radioRight'+("0"+i).slice(-2));
        input.bind('click', clickRadio);
        input.bind('mousewheel', wheelRadio);
        tr.append($('<td>').attr('class', 'checkbox').append(input));
        
        $(table).append(tr);
    }

    checkRadios();
};

/*
 * Handle radio click
 */
experimentLeft = 1;
experimentRight = 2;

clickRadio = function(event) {
    var experiment = parseInt(event.srcElement.id.substring(-2, 0));
    if (event.srcElement.name == "radioLeft") {
        chart1.clearPlot();
        chart3.clearPlot();
        chart1.plotColumn(experiment);
        chart3.plotColumn(experiment);
        experimentLeft = experiment;
    }
    else if (event.srcElement.name == "radioRight") {
        chart2.clearPlot();
        chart4.clearPlot();
        chart2.plotColumn(experiment);
        chart4.plotColumn(experiment);
        experimentRight = experiment;
    }
};

/*
 * Handle mouse wheel events
 */
var checkRadios = function() {
    for (var i=1; i<=16; i++) {
        document.getElementById("radioLeft"+("0"+i).slice(-2)).checked = (i==experimentLeft);
        document.getElementById("radioRight"+("0"+i).slice(-2)).checked = (i==experimentRight);
    }
};

var previous = function(event) {
    if (event.srcElement.name == "radioLeft") {
        if (experimentLeft <= 1)
            return
        experimentLeft -= 1;
    }
    else if (event.srcElement.name == "radioRight") {
        if (experimentRight <= 1)
            return
        experimentRight -= 1;
    }
    checkRadios();
};

var next = function(event) {
    if (event.srcElement.name == "radioLeft") {
        if (experimentLeft >= 16)
            return
        experimentLeft += 1;
    }
    else if (event.srcElement.name == "radioRight") {
        if (experimentRight >= 16)
            return
        experimentRight += 1;
    }
    checkRadios();
};

wheelRadio = function(event) {
    if (!event)
        event = window.event;
    if (event.detail < 0)
        previous(event);
    else if (event.detail > 0)
        next(event);
};
