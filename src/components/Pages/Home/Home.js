import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'
import { MainContent } from '../../shared/Content/MainContent'
import { VictoryChart, VictoryTheme, VictoryLine, VictoryPie } from 'victory'

export class Home extends Component  {
    render() {
        return  (
            <div>
                <Header as='h2' className="sub-header-text">Dashboard</Header>
                <MainContent>
                    <Grid columns={3}>
                        <Grid.Column width={4}>
                            <Header as='h3'>Queued Vs Sent Msgs</Header>
                            <VictoryPie
                                data={[
                                    { x: "Sent", y: 65 },
                                    { x: "Queued", y: 40 },
                                    { x: "Errored", y: 55 }
                                ]}
                                categories={{ x: ["Sent", "Queued", "Errored"] }}
                                colorScale={["orange", "cyan", "navy" ]}
                                theme={VictoryTheme.material}
                                animate={{
                                    duration: 2000
                                    }}
                                />
                        </Grid.Column>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h3'>IL Success Rate</Header>
                            <VictoryChart
                                theme={VictoryTheme.material}
                                >
                                <VictoryLine
                                    style={{
                                    data: { stroke: "#c43a31" },
                                    parent: { border: "1px solid #ccc"}
                                    }}
                                    animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                    }}
                                    data={[
                                    { x: 1, y: 2 },
                                    { x: 2, y: 3 },
                                    { x: 3, y: 5 },
                                    { x: 4, y: 4 },
                                    { x: 5, y: 7 }
                                    ]}
                                />
                            </VictoryChart>
                        </Grid.Column>
                    </Grid>

                    
                </MainContent>
            </div>
        )
    }
}
