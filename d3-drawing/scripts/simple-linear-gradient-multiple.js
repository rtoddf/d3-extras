var container_parent = $('.display'),
	chart_container = $('#example'),
	margins = {top: 20, right: 20, bottom: 20, left: 20},
	width = container_parent.width() - margins.left - margins.right,
	height = (width * 0.5) - margins.top - margins.bottom,
	vis, vis_group, aspect

var colorStops = [
	{
		'stop': 0,
		'color': 'rgba(174,0,0,1)'
	},
	{
		'stop': .25,
		'color': 'rgba(255,140,0,1)'
	},
	{
		'stop': .5,
		'color': 'rgba(174,0,0,1)'
	},
	{
		'stop': .75,
		'color': 'rgba(255,140,0,1)'
	},
	{
		'stop': 1,
		'color': 'rgba(174,0,0,1)'
	}
]

vis = d3.select('#example').append('svg')
	.attr({
		'width': width + margins.left + margins.right,
		'height': height + margins.top + margins.bottom,
		'preserveAspectRatio': 'xMinYMid',
		'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
	})

vis_group = vis.append('g')
	.attr({
		'transform': 'translate(' + margins.left + ', ' + margins.top + ')'
	})

aspect = chart_container.width() / chart_container.height()

var defs = vis_group.append('defs')
	.append('linearGradient')
		.attr({
			'id': 'three_stop'
		})

defs.selectAll('stop')
	.data(colorStops)
		.enter().append('stop')
	.attr({
		'offset': function(d){
			return d.stop
		},
	})
	.style({
		'stop-color': function(d){
			return d.color
		}
	})

var square = vis_group.append('rect')
	.attr({
		'width': width,
		'height': height,
		'fill': 'url(#three_stop)'
	})

$(window).on('resize', function() {
	var targetWidth = container_parent.width()
	vis.attr({
		'width': targetWidth,
		'height': Math.round(targetWidth / aspect)
	})
})