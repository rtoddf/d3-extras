var container_parent = document.querySelector('.display'),
	chart_container = document.querySelector('#example'),
	margins = {top: 20, right: 20, bottom: 30, left: 40},
	width = +container_parent.offsetWidth - margins.left - margins.right,
	height = +(+container_parent.offsetWidth * 0.4) - margins.top - margins.bottom,
	vis, vis_group, aspect

// console.log("chart_container: ", chart_container)

var svgWidth = +container_parent.offsetWidth
var svgHeight = +(+container_parent.offsetWidth * 0.4)

vis = d3.select('svg')
	.attr('width', svgWidth)
	.attr('height', svgHeight)

// v3
// var x = d3.scale.ordinal().rangeRoundBands([ 0, width ], .1)
// var y = d3.scale.linear().range([ height, 0 ])

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
	y = d3.scaleLinear().rangeRound([height, 0]);

var vis_group = vis.append('g')
	.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

aspect = chart_container.offsetWidth / chart_container.offsetHeight

d3.tsv("data/letter-frequency.tsv").then(function(data, error) {
	if (error) throw error;

	data.forEach(function(d) {
		// make all intergers and positive
		d.frequency = +d.frequency;
	});

	x.domain(data.map(function(d) {
		return d.letter;
	}));

	y.domain([0, d3.max(data, function(d) {
		return d.frequency;
	})]);

	vis_group.append('g')
		.attr('class', 'axis axis--x')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(x));

	vis_group.append('g')
		.attr('class', 'axis axis--y')
		.call(d3.axisLeft(y).ticks(10, '%'))
	.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '0.71em')
		.attr('text-anchor', 'end')
		.text('Frequency');

	vis_group.selectAll('.bar')
		.data(data)
		.enter().append('rect')
			.attr('class', 'bar')
			.attr('x', function(d) { return x(d.letter); })
			.attr('y', function(d) { return y(d.frequency); })
			.attr('width', x.bandwidth())
			.attr('height', function(d) { return height - y(d.frequency); })
			.attr('fill', 'lightblue')
			.attr({
				'fill': 'lightblue'
			})
})