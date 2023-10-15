import React, { useState } from 'react'
import { Scrollama, Step } from 'react-scrollama'
import MapChart from '../PopulationMap/PopulationMap'
import { Box } from 'theme-ui'

const sx = {
  scrolly: {
    margin: '0px auto',
    paddingTop: '100px',
    maxWidth: '900px',
    display: 'block',
    position: 'relative',
  },
  background: {
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    top: '50px',
    zIndex: '-1',
  },
  step: {
    background: 'background',
    border: '1px solid gray',
    margin: '50vh auto',
    maxWidth: '400px',
    padding: '20px',
  },
}

const ScrollamaDemo = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null)

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data)
  }

  return (
    <Box sx={{ ...sx.scrolly }}>
      <Box sx={{ ...sx.background }}>
        <MapChart step={currentStepIndex} />
      </Box>
      <Scrollama offset={0.5} onStepEnter={onStepEnter}>
        <Step data={1}>
          <Box sx={{ ...sx.step, marginTop: '0px' }}>
            In this demo, I'm using the population data from the Rest Countries
            API to continue the conversation about{' '}
            <a href='https://carbonplan.org/research/extreme-heat-explainer'>
              wet-bulb globe temperatures
            </a>
            .
          </Box>
        </Step>
        <Step data={2}>
          <Box sx={{ ...sx.step }}>
            Countries that lie within the{' '}
            <Box as='span' sx={{ color: 'red' }}>
              Torrid Zone
            </Box>{' '}
            (the hottest central belt of the earth, between the Tropic of Cancer
            and the Tropic of Capricorn) will experience some of the most
            consistently dangerous heat.
          </Box>
        </Step>
        <Step data={3}>
          <Box sx={{ ...sx.step }}>
            Areas such as Sub-Saharan Africa will face additional struggles due
            to a lack of access to cooling. This will affect at least 1.1
            billion people.
          </Box>
        </Step>
        <Step data={4}>
          <Box sx={{ ...sx.step }}>
            India and Pakistan will face economic challenges due to industries
            where work is primarily done outside, such as agriculture and
            construction.
          </Box>
        </Step>
        <Step data={4}>
          <Box sx={{ ...sx.step, height: '50vh', opacity: '0%' }} />
        </Step>
      </Scrollama>
    </Box>
  )
}

export default ScrollamaDemo
