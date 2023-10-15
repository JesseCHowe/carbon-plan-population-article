const ControlStory = (theme, chart, step) => {
  const bubbles = chart.selectAll('.bubbles circle')
  const torridZone = chart.select('.torrid-zone')

  torridZone.style('opacity', step === 2 ? '25%' : '0%')
  bubbles.style('opacity', '100%')
  bubbles.style('stroke', theme.colors.primary)

  if (step === 1) {
    bubbles.style('opacity', '100%')
  }
  if (step === 2) {
    bubbles.style('opacity', (d) =>
      d.lat <= 23.5 && d.lat >= -23.5 ? '100%' : '0%'
    )
  }
  if (step === 3) {
    bubbles.style('opacity', (d) =>
      d.region === 'Africa' && d.subregion !== 'Northern Africa' ? '100%' : '0%'
    )
  }
  if (step === 4 || step === 5) {
    bubbles.style('opacity', (d) =>
      d.name === 'India' || d.name === 'Pakistan' ? '100%' : '0%'
    )
    bubbles.style('stroke', (d) => {
      if (d.name == 'India') return theme.colors.orange
      if (d.name == 'Pakistan') return theme.colors.purple
    })
  }
}

export default ControlStory
