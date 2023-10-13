import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const MapChart = () => {
  const height = 600
  const width = 600
  const svgRef = useRef()

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMin slice')
      .attr('width', '100%')
      .attr('height', 'auto')
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    const projection = d3.geoNaturalEarth1()
    const path = d3.geoPath().projection(projection)
    projection.scale(1).translate([0, 0])
    // Load external data
    d3.json(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
    ).then((data) => {
      const b = path.bounds(data),
        s =
          0.99 /
          Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [
          (width - s * (b[1][0] + b[0][0])) / 2,
          (height - s * (b[1][1] + b[0][1])) / 2,
        ]

      projection.scale(s).translate(t)
      // Draw the map
      svg
        .append('g')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .style('fill', 'none')
        .style('stroke', '#fff')
        .style('stroke-width', 0.25)
        .attr('d', d3.geoPath().projection(projection))
    })
  }, [])

  return (
    <div
      style={{
        margin: '0px auto',
        width: '100%',
        maxWidth: '900px',
        display: 'block',
        position: 'relative',
      }}
    >
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  )
}

export default MapChart
