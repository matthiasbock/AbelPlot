LineChart = function() {

    var LineChart = {};

    //
    // Import data:
    // Create arrays from the tab-separated input values
    //
    LineChart.importTSV = function(elementID) {
        // the raw text from the specified script element is parsed as tab-separated value table
        var input = document.getElementById(elementID).innerHTML.trim();
        var tsv = d3.tsv.parseRows(input);
        //var header = tsv[0];
        var data = tsv.slice(1);

        // the current object will use inputDataTable to refer to the actual table values we need for plotting
        this.inputDataTable = Array(16);

        // thereby each array of columns element is an array of rows
        for (var i=1; i<=16; i++) this.inputDataTable[i] = [];
        
        // the first table column contains the hours, therefore the rows are addressed accordingly
        // and set to the float value of the input table at this position
        data.forEach(function(row) {
                    hour = row[0];
                    for (var i=1; i<=16; i++) this.inputDataTable[i][hour] = parseFloat(row[i]);
                    });
        };

    //
    // Create Scalable Vector Graphic
    //
    LineChart.createSVG = function() {
        //
        // Insert SVG below HTML BODY
        //
        var margin = {top: 20, right: 20, bottom: 30, left: 50};
        var width = 960 - margin.left - margin.right;
        var height = 500 - margin.top - margin.bottom;
        this.SVG = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //
        // Create X axis
        //
        var x = d3.scale.linear().range([0, width]).domain([0, 24]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        this.SVG.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
                .text("Time (h)")
                .attr("transform", "translate(" + (width-60) + ", 18)");

        //
        // Create Y axis
        //
        var y = d3.scale.linear().range([height, 0]).domain([0, 0.5]);
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");
        this.SVG.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -45)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Protein concentration (a.u.)");
    };

    //
    // Create an SVG path defining string
    // http://www.janwillemtulp.com/2011/04/01/tutorial-line-chart-in-d3/
    //
    var arrayToPath = function(data) {
        result = "M"+x(0)+","+y(data[0]);
        for (var i=1; i<=24; i++)
            if (typeof(data[i]) != typeof(undefined))
                result += "L"+x(i)+","+y(data[i]);
    //    console.log(result);
        return result;
        };

    //
    // Draw a line into the chart
    //
    LineChart.plotArray = function(data) {
        this.SVG.append("path")
    //        .attr("id", "concentration"+index)
            .attr("class", "line")
            .attr("d", arrayToPath(data));
    
        for (var i=1; i<=24; i++)
            if (typeof(data[i]) != typeof(undefined))
                this.SVG.append("rect")
                    .attr("class", "rect")
                    .attr("x", x(i)-3)
                    .attr("y", y(data[i])-3)
                    .attr("width", "6")
                    .attr("height", "6");
        };

    //
    // Draw all experiments
    //
    LineChart.plotAllDataColumns = function() {
        for (var i=1; i<=16; i++)
            plotArray(this.inputDataTable[i]);
    };

    return LineChart;
}();