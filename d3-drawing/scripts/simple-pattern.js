var container_parent = $('.display'),
	chart_container = $('#example'),
	margins = {top: 20, right: 20, bottom: 20, left: 20},
	width = container_parent.width() - margins.left - margins.right,
	height = (width * 0.5) - margins.top - margins.bottom,
	vis, vis_group, aspect

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

defs.append('pattern')
	.attr({
		'id': 'tile',
		'x': 0,
		'y': 0,
		'width': '10%',
		'height': '10%',
		'patternUnits': 'objectBoundingBox'
	})
.append('path')
	.attr({
		'd': 'M 0 0 Q 5 20 10 10 T 20 20',
		'stroke': 'white',
		'stroke-width': 1,
		'fill': 'none'
	})

var gradient = defs.append('linearGradient')
	.attr({
		'id': 'gradient'
	})

gradient.append('stop')
	.attr({
		'offset': 0,
		'stop-color': '#ae0000'
	})

gradient.append('stop')
	.attr({
		'offset': 1,
		'stop-color': 'darkorange'
	})

vis_group.append('rect')
	.attr({
		'width': width,
		'height': height,
		'fill': 'url(#gradient)'
	})

vis_group.append('rect')
	.attr({
		'width': width,
		'height': height,
		'fill': 'url(#tile)'
	})

$(window).on('resize', function() {
	var targetWidth = container_parent.width()
	vis.attr({
		'width': targetWidth,
		'height': Math.round(targetWidth / aspect)
	})
})