//
// Import data:
// Create arrays from the above tab-separated values
//
var input = document.getElementById('phosphorylation').innerHTML.trim();
var tsv = d3.tsv.parseRows(input);
var header = tsv[0];
var data = tsv.slice(1);
var phosphorylation = Array(16);
for (i=1; i<=16; i++) phosphorylation[i] = [];
data.forEach(function(row) {
			hour = row[0];
			for (var i=1; i<=16; i++) phosphorylation[i][hour] = parseFloat(row[i]);
			});

//
// Create Scalable Vector Graphic
//
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var phosphorylationSVG = d3.select("body").append("svg")
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
phosphorylationSVG.append("g")
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
phosphorylationSVG.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", -45)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Protein phosphorylation (a.u.)");

//
// Draw a line
// http://www.janwillemtulp.com/2011/04/01/tutorial-line-chart-in-d3/
//
var line = function(data) {
	result = "M"+x(0)+","+y(data[0]);
	for (var i=1; i<=24; i++)
		if (typeof(data[i]) != typeof(undefined))
			result += "L"+x(i)+","+y(data[i]);
//	console.log(result);
	return result
	}

var drawExperiment = function(data) {
	phosphorylationSVG.append("path")
//		.attr("id", "phosphorylation"+index)
		.attr("class", "line")
		.attr("d", line(data));

	for (var i=1; i<=24; i++)
		if (typeof(data[i]) != typeof(undefined))
			phosphorylationSVG.append("rect")
				.attr("class", "rect")
				.attr("x", x(i)-3)
				.attr("y", y(data[i])-3)
				.attr("width", "6")
				.attr("height", "6");
	}

for (var i=1; i<=16; i++)
	drawExperiment(phosphorylation[i]);
