import { Layout, Row, Column } from '@carbonplan/components'
import ScrollytellingStory from '../components/Scroller/Scroller'
import MapChart from '../components/PopulationMap/PopulationMap'

const Index = () => {
  return (
    <Layout>
      <Row sx={{ fontSize: [4, 5, 6, 7], my: [5, 6, 7, 8] }}>
        <Column start={[1, 2, 2, 2]} width={[6]}>
          This is a sample site
        </Column>
      </Row>
      <ScrollytellingStory />
    </Layout>
  )
}

export default Index
