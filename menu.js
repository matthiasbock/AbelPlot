/*
 * Create experiment chooser
 */

createMenu = function() {
    var header = $('<tr>');
    header.append($('<th>').append('Experiment'));
    for (var i=1; i<=16; i++)
        header.append($('<th>').append(i));

    var left = $('<tr>');
    left.append($('<td>').append('Left'));
    for (var i=1; i<=16; i++)
        left.append($('<td>').append(i));

    var right = $('<tr>');
    right.append($('<td>').append('Right'));
    for (var i=1; i<=16; i++)
        right.append($('<td>').append(i));

    $('menu').append(header).append(left).append(right);
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
        document.getElementById("radioLeft"+i).checked = (i==experimentLeft);
        document.getElementById("radioRight"+i).checked = (i==experimentRight);
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
