import React, { Component } from 'react'
import { Header, Grid, Segment, Label, Divider } from 'semantic-ui-react'
import { MainContent } from '../../shared/Content/MainContent'
import { VictoryChart, VictoryTheme, VictoryLine, VictoryPie } from 'victory'

export class Home extends Component  {
    render() {
        return  (
            <div>
                <Header as='h2' className="sub-header-text">Dashboard</Header>
                <MainContent>
                    <Grid columns={3}>
                        <Grid.Column width={5}>
                            <Header as='h3' className="stats-header">Messages exchanged</Header>
                            <Segment inverted> 
                                <Label circular color="green" empty key={10} />  Total
                                <Label circular color="teal" className="stats-circular-data" key={52}>4567</Label>
                                <Divider/>
                                <Label className="stats-sub-header">per message type  </Label>
                                    <Divider/>
                                    <Label circular color="green" empty key={1} />  Patient Registration 
                                    <Label circular color="yellow" className="stats-circular-data" key={5}>4567</Label>
                                    <Divider/>
                                    <Label circular color="green" empty key={2} />  Patient Update 
                                    <Label circular color="green" className="stats-circular-data" key={6}>7695</Label>
                                    <Divider/>
                                    <Label circular color="green" empty key={3} />  Pharmacy Order 
                                    <Label circular color="orange" className="stats-circular-data" key={7}>13</Label>
                                    <Divider/>
                                    <Label circular color="green" empty key={4} />  Viral Load Results
                                    <Label circular color="olive" className="stats-circular-data" key={8}>45</Label>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={3}></Grid.Column>
                        <Grid.Column width={5}>
                            <Header as='h3' className="chart-header">Message Status Visualization</Header>
                            <VictoryPie
                                data={[
                                    { x: "Sent", y: 65 },
                                    { x: "Queued", y: 40 },
                                    { x: "Errors", y: 55 }
                                ]}
                                categories={{ x: ["Sent", "Queued", "Errored"] }}
                                colorScale={"heatmap"}
                                theme={VictoryTheme.material}
                                style={{ labels: { fill: "black", fontSize: 14, fontWeight: "bold" } }}
                                height={350}
                                animate={{
                                    duration: 2000
                                    }}
                                />
                        </Grid.Column>
                        <Grid.Column width={13}></Grid.Column>
                        <Grid.Column width={5}>
                            <Header as='h3' className="chart-header">Daily Traffic Comparison</Header>
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
                                    { x: 'Mon', y: 10 },
                                    { x: 'Tue', y: 30 },
                                    { x: 'Wed', y: 50 },
                                    { x: 'Thur', y: 40 },
                                    { x: 'Fri', y: 70 }
                                    ]}
                                />
                            </VictoryChart>
                        </Grid.Column>
                        <Grid.Column width={3}></Grid.Column>
                        <Grid.Column width={5}>
                            <Header as='h3' className="stats-header">Entities online</Header>
                            <Segment inverted>
                                    <Label className="stats-sub-header">last checked - 2017-08-08 10:40 AM  </Label>
                                    <Divider/>
                                    <Label circular color="green" empty key={1} />  ADT 
                                    <Divider/>
                                    <Label circular color="green" empty key={2} />  IQCARE
                                    <Divider/>
                                    <Label circular color="green" empty key={3} />  T4A
                                    <Divider/>
                                    <Label circular color="green" empty key={4} />  CACHED_EID
                                    <Divider/>
                                    <Label circular color="red" empty key={5} />  REMOTE_EID
                                    <Divider/>
                                    <Label circular color="green" empty key={6} />  MPI
                            </Segment>
                        </Grid.Column> 
                    </Grid>

                    
                </MainContent>
            </div>
        )
    }
}
