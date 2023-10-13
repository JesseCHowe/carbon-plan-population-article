import React, { useState } from 'react'
import { Scrollama, Step } from 'react-scrollama'
import MapChart from '../PopulationMap/PopulationMap'

const ScrollamaDemo = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null)

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data)
  }

  return (
    <div
      style={{
        margin: '0px auto',
        paddingTop: '100px',
        maxWidth: '900px',
        display: 'block',
        position: 'relative',
        border: '0.1px solid rgba(0,0,0,0)',
      }}
    >
      <div
        style={{
          position: 'sticky',
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          top: 0,
          zIndex: -1,
        }}
      >
        <MapChart />
      </div>
      <Scrollama offset={0.5} onStepEnter={onStepEnter}>
        {[1, 2, 3, 4].map((_, stepIndex) => (
          <Step data={stepIndex} key={stepIndex}>
            <div
              style={{
                margin: '50vh auto',
                maxWidth: '400px',
                background: '#1b1e23',
                padding: '20px',
                border: '1px solid gray',
                opacity: '100%',
              }}
            >
              I'm a Scrollama Step of index {stepIndex}
            </div>
          </Step>
        ))}
      </Scrollama>
    </div>
  )
}

export default ScrollamaDemo
