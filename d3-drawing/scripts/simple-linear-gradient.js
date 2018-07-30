var container_parent = $('.display'),
	chart_container = $('#example'),
	margins = {top: 20, right: 20, bottom: 20, left: 20},
	width = container_parent.width() - margins.left - margins.right,
	height = (width * 0.5) - margins.top - margins.bottom,
	vis, vis_group, aspect

var vis = d3.select('#example').append('svg')
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

var linearGradient = defs.append('linearGradient')
	.attr({
		'id': 'two_hues'
	})

linearGradient.append('stop')
	.attr({
		'offset': '0%'
	})
	.style({
		'stop-color': '#003264'
	})

linearGradient.append('stop')
	.attr({
		'offset': '100%'
	})
	.style({
		'stop-color': '#baba71'
	})

var rect = vis_group.append('rect')
	.attr({
		'width': width,
		'height': height,
		'stroke': 'black',
		'fill': 'url(#two_hues)'
	})

$(window).on('resize', function() {
	var targetWidth = container_parent.width()
	vis.attr({
		'width': targetWidth,
		'height': Math.round(targetWidth / aspect)
	})
})