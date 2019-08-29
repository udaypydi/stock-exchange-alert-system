import React, { useEffect } from 'react';
import { Segment, Icon, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Text,
    LineChart,
    Line,
  } from "recharts";
  /** @jsx jsx */
import { css, jsx } from '@emotion/core';
import AddWidgets from 'components/addwidgets/addwidgets.component';
import { COLOR_MAPPING, CURRENCY_GRAPH_DATA, ALERT_SIGNAL_HISTORY } from './dashboardhome.constant';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import Header from 'commons/header/header.component';
import { fetchCurrencyData, formatChartData } from './dashboardhome.action';
import styles from './dashboardhome.styles';

function renderCurrencyGraph(currencyData) {
    const { currencyGraphs, isLoading } = currencyData;
    // const { sidebar, user } = props;

    const areaChartWidth = (window.screen.availWidth) * 90 / 100;

    return (
        <div css={styles.mobileChartContainer}>
            {
                currencyGraphs.map((data, index) => (
                    <Segment raised css={styles.chartCard} style={{ marginTop: 0, borderRadius: 10, width: '90%', height: 170 }} key={index} loading={isLoading}>
                              {
                            !isLoading && (
                                <React.Fragment>
                                    <div css={styles.chartData}>
                                    <div>
                                        <p
                                        style={{
                                            fontWeight: "bold",
                                            fontSize: 30,
                                            margin: 0,
                                            marginTop: 20
                                        }}
                                        >
                                        {data.data[0].price}
                                        </p>
                                        <p
                                        style={{ margin: 0, fontSize: 12, color: "rgba(0, 0, 0, 0.5) " }}
                                        >
                                        {data.currency}
                                        </p>
                                    </div>
                                    </div>
                                    {
                                        data.graphStyle !== 'GRAPH_3' ? (
                                            <AreaChart
                                                width={areaChartWidth}
                                                height={75}
                                                data={data.data}
                                                style={{ position: "absolute", bottom: 0, borderRadius: 10 }}
                                                margin={{top: 0, right: 0, left: 0, bottom: 0}}
                                                >
                                                <defs style={{ borderRadius: 10 }}>
                                                    <linearGradient id={`colorUv-${index}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={COLOR_MAPPING[data.graphStyle].colors[0]} stopOpacity={0.9} />
                                                    <stop offset="95%" stopColor={COLOR_MAPPING[data.graphStyle].colors[1]} stopOpacity={0.9} />
                                                    </linearGradient>
                                                </defs>
                                                <Tooltip />
                                                <Area
                                                    strokeWidth={0}
                                                    stroke='#4D95F3'
                                                    type="monotone"
                                                    dataKey="price"
                                                    stroke={COLOR_MAPPING[data.graphStyle].colors[0]}
                                                    fill={`url(#colorUv-${index})`}
                                                    fillOpacity={1}
                                                />
                                                <YAxis type="number" domain={data.domain} hide />
                                            </AreaChart>
                                        ) : (
                                            <LineChart
                                                width={areaChartWidth}
                                                height={75}
                                                data={data.data}
                                                style={{ position: "absolute", bottom: 0, borderRadius: 10 }}
                                                margin={{top: 5, right: 5, left: 5, bottom: 5}}
                                            >
                                                <Tooltip/>
                                                <Line dataKey="price" stroke="#038FDE" dot={{stroke: '#FEA931', strokeWidth: 2}}/>
                                                <YAxis type="number" domain={data.domain} hide />
                                            </LineChart>
                                        )
                                    }
                                </React.Fragment>
                            )
                        }
                    </Segment>
                ))
            }
        </div>
    );
}

function renderAlertsGraph(currencyData) {
    const { eurusd, usdjpy, usdgyd, audnzd } = currencyData;
    const graphWidth = (window.innerWidth / 100) * 90;
    return (
        <Segment raised css={styles.alertGraphCard} 
            style={{ 
                borderRadius: 10, 
                width: '90%', 
                height: 250, 
                float: 'right',
            }}
        >
            <div css={css`${styles.chartData} left: -55px; top: 30px;`}>
                <p>Alerts History</p>
            </div>
                <AreaChart
                    width={graphWidth}
                    height={180}
                    data={ALERT_SIGNAL_HISTORY}
                    style={{ position: "absolute", bottom: 0, borderRadius: 10, bottom: 0 }}
                    margin={{top: 0, right: 0, left: 0, bottom: 0}}
                    >
                    <defs style={{ borderRadius: 10 }}>
                        <linearGradient id={`colorUv-15`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={'#38AAE5'} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={'#F5FCFD'} stopOpacity={0.8} />
                        </linearGradient>
                    </defs>
                    <Tooltip />
                    <Area
                        strokeWidth={2}
                        stroke='#10316B'
                        dataKey="alerts"
                        stroke={CURRENCY_GRAPH_DATA[0].colors[0]}
                        fill={`url(#colorUv-15)`}
                        fillOpacity={1}
                    />
                    <YAxis type="number" domain={[0, 500]} hide />
                </AreaChart>
        </Segment>
    );
}

function DashboardHomeMobile(props) {

    const { dashboardCurrencyData, user, sidebar } = props;

    return (
        <div css={styles.container}>
            <Header />
            {
                sidebar.mobileSidebarOpen && (
                    <CustomSidebar />
                )
            }
                <div style={{ position: 'absolute', top: 70, right: 30 }}>
                    <AddWidgets />
                </div>
                {renderCurrencyGraph(dashboardCurrencyData)}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {   
                    user.alerts && (
                        
                        <Segment style={{ width: '90%', height: 250, marginTop: 20 }} raised>
                            <h2 style={{ textAlign: 'center' }}>Profile Summary</h2>
                            <div>
                                <div
                                    style={{
                                    display: "flex",
                                    marginTop: 30,
                                    justifyContent: "space-between"
                                    }}
                                >
                                    <Icon name="bell" color="blue" style={{ fontSize: 20 }} />
                                    <p>Total Alerts</p>
                                    <p>-</p>
                                    <p>{user.alerts.length}</p>
                                </div>
                                <div
                                    style={{
                                    display: "flex",
                                    marginTop: 30,
                                    justifyContent: "space-between"
                                    }}
                                >
                                    <Icon name="mail forward" color="blue" style={{ fontSize: 20 }} />
                                    <p>No of Followers</p>
                                    <p>-</p>
                                    <p>{user.followers.length}</p>
                                </div>
                                <div
                                    style={{
                                    display: "flex",
                                    marginTop: 30,
                                    justifyContent: "space-between"
                                    }}
                                >
                                    <Icon name="chart pie" color="blue" style={{ fontSize: 20 }} />
                                    <p>Followed by You</p>
                                    <p>-</p>
                                    <p>{user.following.length}</p>
                                </div>
                            </div>
                        </Segment>
                    )
                }
                {renderAlertsGraph(dashboardCurrencyData)}
                </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dashboardCurrencyData: state.dashboard,
    user: state.user,
    sidebar: state.sidebar,
    currencyGraphs: state.dashboard.currencyGraphs,
});

export default connect(mapStateToProps)(DashboardHomeMobile);
