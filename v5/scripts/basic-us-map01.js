// http://bl.ocks.org/rveciana/a2a1c21ca1c71cd3ec116cc911e5fce9

var container_parent = document.querySelector('.display') ,
    chart_container = document.querySelector('#map'),
    margins = {top: 0, right: 20, bottom: 20, left: 20},
    width = container_parent.offsetWidth,
    height = (width * .6),
    vis, vis_group, aspect

var projection = d3.geoAlbersUsa();
var path = d3.geoPath()
	.projection(projection);

vis = d3.select('#map').append('svg')
	.attrs({
		'width': width + margins.left + margins.right,
		'height': height + margins.top + margins.bottom,
		'preserveAspectRatio': 'xMinYMid',
		'viewBox': '0 0 ' + (width + margins.left + margins.right) + ' ' + (height + margins.top + margins.bottom)
	})

vis_group = vis.append('g')
aspect = chart_container.offsetWidth / chart_container.offsetHeight

d3.json("data/us.json").then(function(us, error) {
	vis_group.append('path')
	  .attrs({
		'fill': '#ccc',
		'stroke': '#333',
		'stroke-width': '1px'
	  })
	  .datum(topojson.feature(us, us.objects.states))
	  .attr('d', path);  
});