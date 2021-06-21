const svg = d3.create('svg');

var group = svg.append("g");

group.append("circle")
    .attr("cx", 85)
    .attr("cy", 75)
    .attr("r", 50);

group.append("circle")
    .attr("cx", 215)
    .attr("cy", 75)
    .attr("r", 50);

group
    .attr("fill", "#40F99B");


d3.select("#container")
    .append(() => svg.node());