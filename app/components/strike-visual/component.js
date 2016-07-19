/* globals d3, topojson */

import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    const data = this.get('data');

    let width = 960,
        height = 600;

    let color = d3.scaleOrdinal(d3.schemeCategory20);

    let projection = d3.geoMercator()
      .center([61, 24])
      .scale(300);

    let path = d3.geoPath().projection(projection);

    let container = d3.select('#strike-visual');

    let svg = container.append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('display', 'block')
      .style('margin', '0 auto')
      .style('border', '1px solid #ddd');

    let g = svg.append('g');

    let countriesGroup = g.append('g').classed('countries-group', true);

    let strikesGroup = g.append('g').classed('strikes-group', true);

    d3.json('data/countries.topojson', function(error, map) {
      if ( error ) {
        return console.error(error);
      }

      countriesGroup.selectAll('.country')
        .data(topojson.feature(map, map.objects.collection).features)
        .enter().append('path')
          .attr('class', function(d) {
            let name = d.properties.name.replace(' ', '').toLowerCase();
            return 'country ' + name;
          })
          .attr('d', path)
          .style('fill', function(d,i) { return color(i); })
          .style('stroke', '#fff')
          .style('opacity', '.75');

      strikesGroup.selectAll('circle')
        .data(data)
        .enter().append('circle')
          .attrs({
            cx: function(d) { return projection([d.lon, d.lat])[0]; },
            cy: function(d) { return projection([d.lon, d.lat])[1]; },
            r: 2,
          })
          .style('fill', 'red')
          .style('stroke', 'black');

    });

    var zoom = d3.zoom()
      .on("zoom", function() {
        let { transform } = d3.event;

        g.attr( "transform", transform);

        strikesGroup.selectAll("circle")
          .attr("d", path.projection(projection));

        countriesGroup.selectAll("path")
          .attr("d", path.projection(projection));
      });

    svg.call(zoom);
  }
});
