import React from 'react'
import { VictoryPie, VictoryLabel, VictoryTheme } from 'victory'
import { Container } from 'semantic-ui-react'

export const MessageStatsPie = ({ data }) => {
  let msgPieChart = null

  let dataToShow = []
  if (data.sent) {
    dataToShow.push({
      x: 'Sent',
      y: data.sent / data.received,
      label: `Sent (${data.sent})`
    })
  }
  if (data.queued) {
    dataToShow.push({
      x: 'Queued',
      y: data.queued / data.received,
      label: `Queued (${data.queued})`
    })
  }
  if (data.errored) {
    dataToShow.push({
      x: 'Errors',
      y: data.errored / data.received,
      label: `Errors (${data.errored})`
    })
  }

  msgPieChart = data.received ? (
    <VictoryPie
      labelComponent={<VictoryLabel />}
      data={dataToShow}
      events={[
        {
          target: 'data',
          eventHandlers: {
            onClick: () => {
              return [
                {
                  target: 'labels',
                  mutation: props => {
                    return props.text === 'clicked' ? null : { text: 'clicked' }
                  }
                }
              ]
            }
          }
        }
      ]}
      categories={{ x: ['Submitted', 'Queued', 'Errors'] }}
      colorScale={['green', 'gold', 'red']}
      theme={VictoryTheme.material}
      className="pie-chart"
      style={{
        labels: { fill: 'maroon', fontWeight: 'bolder', paddingTop: '1px' }
      }}
      height={300}
    />
  ) : (
    <Container className="no-mesaages-span">There are currently no messages exchanged!</Container>
  )

  return msgPieChart
}
