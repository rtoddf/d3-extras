var container_parent = document.querySelector('.display') ,
	chart_container = document.querySelector('#map'),
	margins = {top: 20, right: 20, bottom: 20, left: 20},
	width = container_parent.offsetWidth,
	height = width - margins.top - margins.bottom,
	vis, vis_group, aspect,
	scale_amount = '1.15'

var projection = d3.geoAlbers()

var path = d3.geoPath()
	.projection(projection)
	.pointRadius(1.5)

vis = d3.select('#map').append('svg')
	.attrs({
		'width': width,
		'height': height + margins.top + margins.bottom,
		'preserveAspectRatio': 'xMinYMid',
		'viewBox': '0 0 ' + width + ' ' + height
	})

vis_group = vis.append('g')
	.attrs({
        'transform': 'translate(' + -(margins.left) + ', ' + -(margins.top) + ') scale(' + scale_amount + ')'
    })

aspect = chart_container.offsetWidth / chart_container.offsetHeight

d3.queue()
	.defer(d3.json, 'data/us.json')
	.defer(d3.json, 'data/airports.json')
	.await(ready)

function ready(error, us, airports){
	vis_group.append('path')
		.datum(topojson.feature(us, us.objects.land))
		.attrs({
			'd': path,
			'fill': '#baba71'
		})

	vis_group.append('path')
		.datum(topojson.mesh(us, us.objects.states, function(a, b){
			return a !== b
		}))
		.attrs({
			'd': path,
			'fill': 'none',
			'stroke': '#333',
			'stroke-width': 2
		})

	vis_group.append('path')
		.datum(topojson.feature(airports, airports.objects.airports))
		.attrs({
			'd': path,
			'fill': '#fff',
		})
}

// $(window).on('resize', function() {
// 	var targetWidth = container_parent.width()
// 	vis.attrs({
// 		'width': targetWidth,
// 		'height': Math.round(targetWidth / aspect)
// 	})
// })