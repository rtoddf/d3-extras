const svg = d3.create('svg');

var circle = svg
    .append("circle")
    .attr("cx", 85)
    .attr("cy", 75)
    .attr("r", 50)
    .attr("fill", "#40F99B");

svg
    .style("background-image", "linear-gradient(to right, #420a91, #40F99B)");

var rect = svg
    .append("rect")
    .attr("x", 165)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 100)
    .attr("fill", "#420a91")
    .attr("stroke", "#FF00FF")
    .attr("stroke-width", "4")
    .attr("stroke-dasharray", "10,10");

d3
    .select("#container")
    .append(() => svg.node());