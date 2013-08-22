
/*
 * Create a Line Chart object below HTML element parent
 * 
 * by Matthias Bock <mail@matthiasbock.net>
 * 
 * Example usage:
 * chart = LineChart('#body');
 * chart.createSVG(800, 600, [1, 24], [0, 10], 'Hour', 'Intensity');
 * chart.importTSV('#datablock').plotColumn(1);
 * 
 */

LineChart = function(parent) {
    
    var Chart = {};
    Chart.parent = parent;
    
    //
    // Import data:
    // Create arrays from the tab-separated input values
    //
    Chart.importTSV = function(elementID) {
        // the raw text from the specified script element is parsed as tab-separated value table
        var input = $(elementID).html().trim();
        var tsv = d3.tsv.parseRows(input);
        //var header = tsv[0];
        var data = tsv.slice(1);

        // the current object will use inputDataTable to refer to the actual table values we need for plotting
        this.inputDataTable = Array(16);

        // thereby each array of columns element is an array of rows
        for (var i=1; i<=16; i++)
            this.inputDataTable[i] = [];
        
        // the first table column contains the hours, therefore the rows are addressed accordingly
        // and set to the float value of the input table at this position
        my = this; // because "this" in the for loop below doesn't refer to "Chart"
        data.forEach(
            function(row) {
                hour = row[0];
                for (var i=1; i<=16; i++) {
                    var f = parseFloat(row[i]);
                    if (!isNaN(f))
                        my.inputDataTable[i][hour] = f;
                    }
            }
        );

        return self;
    };

    //
    // Create Scalable Vector Graphic
    //
    Chart.createSVG = function(w, h, xDomain, yDomain, xLabel, yLabel) {
        //
        // Insert SVG below HTML BODY
        //
        var margin = {top: 20, right: 20, bottom: 30, left: 50};
        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;
        this.SVG = d3.select(this.parent).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //
        // Create X axis
        //
        this.x = d3.scale.linear().range([0, width]).domain(xDomain);
        var xAxis = d3.svg.axis()
            .scale(this.x)
            .orient("bottom");
        this.SVG.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
                .text(xLabel)
                .attr("transform", "translate(" + (width-30) + ", 28)");

        //
        // Create Y axis
        //
        this.y = d3.scale.linear().range([height, 0]).domain(yDomain);
        var yAxis = d3.svg.axis()
            .scale(this.y)
            .orient("left");
        this.SVG.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -45)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(yLabel);
        
        return this.SVG;
    };

    //
    // Create an SVG path defining string
    // http://www.janwillemtulp.com/2011/04/01/tutorial-line-chart-in-d3/
    //
    Chart.arrayToPath = function(data) {
        result = "M"+this.x(0)+","+this.y(data[0]);
        for (var i=1; i<=24; i++)
            if (typeof(data[i]) != typeof(undefined))
                result += "L"+this.x(i)+","+this.y(data[i]);
        //    console.log(result);
        return result;
    };

    //
    // Draw a line into the chart
    //
    Chart.plotArray = function(data, index) {
        // group lines and rectangles to toggle visibility
        var g = this.SVG.append("g").attr('id', 'plot'+("0"+index).slice(-2)).attr('style', 'visibility:hidden');
        
        // line
        g.append("path")
            .attr("class", "path path"+("0"+index).slice(-2))
            .attr("d", this.arrayToPath(data));
        
        // put small rectangles on the line at the data points
        var width = 8;
        var height = 8;
        for (var i=0; i<=24; i++)
            if (typeof(data[i]) != typeof(undefined))
                g.append("rect")
                    .attr("class", "rect "+"rect"+("0"+index).slice(-2))
                    .attr("x", this.x(i)-(width/2))
                    .attr("y", this.y(data[i])-(height/2))
                    .attr("width", width)
                    .attr("height", height)
                    .attr("tooltip", data[i]);
        
        return g;
        };
        
    //
    // Draw a line for one column of our data table
    //
    Chart.plotColumn = function(column){
        return this.plotArray(this.inputDataTable[column], column);
    };
        
    //
    // Draw all experiments
    //
    Chart.plotAllColumns = function() {
        this.plot = [];
        for (var i=1; i<=16; i++)
            this.plot[i] = this.plotColumn(i);
        return this.plot;
    };

    //
    // Delete the latest plot line from SVG 
    //
    Chart.clearPlot = function() {
        // delete this.SVG.documentElement.getElementById("line");
    };

    return Chart;
};