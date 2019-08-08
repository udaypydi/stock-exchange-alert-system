import React, { useEffect } from 'react';
import { Segment, Icon } from 'semantic-ui-react';
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
import { CURRENCY_GRAPH_DATA, ALERT_SIGNAL_HISTORY } from './dashboardhome.constant';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import Header from 'commons/header/header.component';
import { fetchCurrencyData, formatChartData } from './dashboardhome.action';
import styles from './dashboardhome.styles';

// const currencies = [eurusd, usdjpy, usdgyd, audnzd];

function renderCurrencyGraph(currencyData) {
    const { eurusd, usdjpy, usdgyd, audnzd } = currencyData;
    return (
        <div css={styles.chartsContainer}>
            {
                [eurusd, usdjpy, usdgyd, audnzd].map((data, index) => data.length && (
                    <Segment raised css={styles.chartCard} style={{ marginTop: 0, borderRadius: 10 }} key={index}>
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
                                    {data[0].price}
                                    </p>
                                    <p
                                    style={{ margin: 0, fontSize: 12, color: "rgba(0, 0, 0, 0.5) " }}
                                    >
                                    {CURRENCY_GRAPH_DATA[index].exchange}
                                    </p>
                                </div>
                                </div>
                                {
                                    index !== 3 ? (
                                        <AreaChart
                                            width={250}
                                            height={75}
                                            data={data}
                                            style={{ position: "absolute", bottom: 0, borderRadius: 10 }}
                                            margin={{top: 0, right: 0, left: 0, bottom: 0}}
                                            >
                                            <defs style={{ borderRadius: 10 }}>
                                                <linearGradient id={`colorUv-${index}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={CURRENCY_GRAPH_DATA[index].colors[0]} stopOpacity={0.9} />
                                                <stop offset="95%" stopColor={CURRENCY_GRAPH_DATA[index].colors[1]} stopOpacity={0.9} />
                                                </linearGradient>
                                            </defs>
                                            <Tooltip />
                                            <Area
                                                strokeWidth={0}
                                                stroke='#4D95F3'
                                                type="monotone"
                                                dataKey="price"
                                                stroke={CURRENCY_GRAPH_DATA[index].colors[0]}
                                                fill={`url(#colorUv-${index})`}
                                                fillOpacity={1}
                                            />
                                            <YAxis type="number" domain={CURRENCY_GRAPH_DATA[index].domain} hide />
                                        </AreaChart>
                                    ) : (
                                        <LineChart
                                            width={250}
                                            height={75}
                                            data={data}
                                            style={{ position: "absolute", bottom: 0, borderRadius: 10 }}
                                            margin={{top: 5, right: 5, left: 5, bottom: 5}}
                                        >
                                            <Tooltip/>
                                            <Line dataKey="price" stroke="#038FDE" dot={{stroke: '#FEA931', strokeWidth: 2}}/>
                                            <YAxis type="number" domain={CURRENCY_GRAPH_DATA[index].domain} hide />
                                        </LineChart>
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
    const graphWidth = (window.innerWidth / 100) * 56;
    return (
        <Segment raised css={styles.chartCard} style={{ marginTop: 20, borderRadius: 10, width: '72%', height: 250, float: 'right', marginRight: 30 }}>
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

function DashboardHome(props) {

    const { dashboardCurrencyData, user } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchCurrencyData());
    }, []);

    return (
        <div css={styles.container}>
            <Header />
            <CustomSidebar />
            {renderCurrencyGraph(dashboardCurrencyData)}
            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', marginLeft: 310 }}>
            {   
                user.alerts && (
                    
                    <Segment style={{ width: '22%', height: 250, marginTop: 20 }} raised>
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
});

export default connect(mapStateToProps)(DashboardHome);
