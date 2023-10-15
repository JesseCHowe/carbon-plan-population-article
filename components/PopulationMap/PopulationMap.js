import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import circle_data from './data.json'
import { Box, useThemeUI } from 'theme-ui'
import ControlStory from './StoryController'

const sx = {
  label: {
    position: 'absolute',
    fontFamily: 'heading',
    letterSpacing: 'smallcaps',
    textAnchor: 'middle',
    fontSize: '12px',
    lineHeight: 1,
    transition: '1s',
  },
  countryName: {
    fontSize: [3],
    displa: 'block',
  },
  countryPop: {
    displa: 'block',
    fontSize: [1],
  },
}

const populationExtent = d3.extent(circle_data, (d) => d.population)
const minPopulation = populationExtent[0]
const maxPopulation = populationExtent[1]

const flanneryScale = (d) => {
  const factor = 1.4 // Adjust this value as needed
  const range = maxPopulation - minPopulation
  const minSize = 0.5 // Minimum bubble size
  const maxSize = 50 // Maximum bubble size

  const scaledSize =
    minSize +
    (1 - Math.exp((-factor * (d - minPopulation)) / range)) *
      (maxSize - minSize)

  return scaledSize
}

const MapChart = ({ step }) => {
  const { theme } = useThemeUI()
  const [chart, setChart] = useState(null)
  const height = 600
  const width = 600
  const svgRef = useRef()

  useEffect(() => {
    if (chart) {
      ControlStory(theme, chart, step)
    }
  }, [step])

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const chartContainer = svg
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

      chartContainer
        .append('g')
        .selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
        .style('stroke', theme.colors.background)
        .style('fill', theme.colors.hinted)
        .style('stroke-width', 0.2)
        .attr('d', d3.geoPath().projection(projection))

      chartContainer
        .append('rect')
        .attr('class', 'torrid-zone')
        .attr('x', 0)
        .attr('y', projection([0, 23.5])[1])
        .attr('height', projection([0, -23.5])[1] - projection([0, 23.5])[1])
        .attr('width', width)
        .style('fill', theme.colors.red)
        .style('opacity', 0)
        .style('transition', '0.5s')

      chartContainer
        .append('g')
        .attr('class', 'latitudes')
        .selectAll('line')
        .data([
          {
            name: 'tropic of cancer',
            lat: 23.5,
          },
          {
            name: 'eqautor',
            lat: 0,
          },
          {
            name: 'tropic of capricorn',
            lat: -23.5,
          },
        ])
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', (d) => projection([0, d.lat])[1])
        .attr('y2', (d) => projection([0, d.lat])[1])
        .style('stroke', theme.colors.primary)
        .style('stroke-dasharray', '2,4')
        .style('stroke-width', 0.5)
        .style('opacity', 0.5)

      chartContainer
        .append('g')
        .attr('class', 'bubbles')
        .selectAll('circle')
        .data(
          circle_data.sort((a, b) => (a.population < b.population ? 1 : -1))
        )
        .enter()
        .append('circle')
        .attr('d', path)
        .style('stroke-width', 0.5)
        .attr('transform', (d) => {
          const point = {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [d.lon, d.lat],
            },
          }
          return 'translate(' + path.centroid(point) + ')'
        })
        .style('fill', 'rgba(0,0,0,0)')
        .style('stroke', theme.colors.primary)
        .style('transition', '0.75s')
        .attr('r', (d) => flanneryScale(d.population))

      setChart(chartContainer)
    })
  }, [])

  return (
    <Box
      sx={{
        margin: '0px auto',
        width: '100%',
        maxWidth: '900px',
        display: 'block',
        position: 'relative',
      }}
    >
      <Box sx={{ ...sx.line, fill: 'yellow' }}>
        <svg ref={svgRef} width={width} height={height}></svg>
      </Box>
      <Box as='span' sx={{ ...sx.label, bottom: '58%' }}>
        Tropic of Cancer
      </Box>
      <Box as='span' sx={{ ...sx.label, top: '47%' }}>
        Equator
      </Box>
      <Box as='span' sx={{ ...sx.label, top: '57%' }}>
        Tropic of Capricorn
      </Box>
      <Box
        as='span'
        sx={{
          ...sx.label,
          top: '50%',
          left: '70%',
          opacity: step >= 4 ? '100%' : '0%',
        }}
      >
        <Box sx={{ ...sx.countryName, color: 'orange' }}>India</Box>
        <Box sx={{ ...sx.countryPop }}>2.38 billion people</Box>
      </Box>
      <Box
        as='span'
        sx={{
          ...sx.label,
          bottom: '65%',
          left: '49%',
          opacity: step >= 4 ? '100%' : '0%',
        }}
      >
        <Box sx={{ ...sx.countryName, color: 'purple' }}>Pakistan</Box>
        <Box sx={{ ...sx.countryPop }}>200 million people</Box>
      </Box>
    </Box>
  )
}
export default MapChart
