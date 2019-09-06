import React, { useEffect, useState } from 'react';
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
import { COLOR_MAPPING, CURRENCY_GRAPH_DATA, ALERT_SIGNAL_HISTORY_DEMO } from './dashboardhome.constant';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import AddWidgets from 'components/addwidgets/addwidgets.component';
import Header from 'commons/header/header.component';
import { fetchCurrencyData, formatChartData } from './dashboardhome.action';
import { getUserState } from 'components/home/home.action';
import { deleteCurrencyPair } from 'components/addwidgets/addwidgets.api';
import DashboardHomeMobile from './dashboardhome.mobile.component';
import styles from './dashboardhome.styles';

// const currencies = [eurusd, usdjpy, usdgyd, audnzd];

function handleDeleteCurrencyPair(activeGraphs, index, props) {
    const { dispatch } = props;

    deleteCurrencyPair(index)
        .then(res => {
            dispatch(getUserState());
        })
}

function renderCurrencyGraph(currencyData, props) {
    const [activeState, setActiveSetState] = useState(null);
    const { currencyGraphs, isLoading } = currencyData;
    const { sidebar, user,  } = props;

    return (
        <div css={styles.chartsContainer} style={{ paddingLeft: sidebar.sidebarOpen ? 290 : 180, marginRight: 0 }}>
            {
                currencyGraphs.length > 0 ? (
                    currencyGraphs.map((data, index) => (
                        <Segment
                            css={styles.chartCard}
                            style={{
                                marginTop: 0,
                                margin: 20,
                                height: 180,
                                width: 300,
                                backgroundColor: '#131633'
                            }}
                            key={index}
                            loading={isLoading}
                            onMouseEnter={() => setActiveSetState(index)}
                            onMouseLeave={() => setActiveSetState(null)}
                        >
                            {
                                activeState === index && (
                                    <Icon
                                        name='trash alternate outline'
                                        color="orange"
                                        style={{
                                            position: 'absolute',
                                            top: 10,
                                            right: 10,
                                            cursor: 'pointer',
                                            zIndex: 999999,
                                        }}
                                        onClick={() => handleDeleteCurrencyPair(user.activeGraphs, index, props)} />
                                )
                            }

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
                                                        marginTop: 20,
                                                        color: '#b1b1b5'
                                                    }}
                                                >
                                                    {data.data[0].price}
                                                </p>
                                                <p
                                                    style={{ margin: 0, fontSize: 12, color: "#545454" }}
                                                >
                                                    {data.currency}
                                                </p>
                                            </div>
                                        </div>
                                        {
                                            data.graphStyle !== 'GRAPH_3' ? (
                                                <AreaChart
                                                    width={300}
                                                    height={75}
                                                    data={data.data}
                                                    style={{ position: "absolute", bottom: 0, borderRadius: 10 }}
                                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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
                                                        width={300}
                                                        height={75}
                                                        data={data.data}
                                                        style={{ position: "absolute", bottom: 0, borderRadius: 10 }}
                                                        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                                    >
                                                        <Tooltip />
                                                        <Line dataKey="price" stroke="#038FDE" dot={{ stroke: '#FEA931', strokeWidth: 2 }} />
                                                        <YAxis type="number" domain={data.domain} hide />
                                                    </LineChart>
                                                )
                                        }
                                    </React.Fragment>
                                )
                            }

                        </Segment>
                    ))
                ) : (
                        user.activeGraphs && user.activeGraphs.map((data, index) => (
                            <Segment
                                css={styles.chartCard}
                                style={{
                                    marginTop: 0,
                                    margin: 20,
                                    height: 180,
                                    width: 300
                                }}
                                key={index}
                                loading={isLoading}
                                onMouseEnter={() => setActiveSetState(index)}
                                onMouseLeave={() => setActiveSetState(null)}
                            >
                                {
                                    activeState === index && (
                                        <Icon
                                            name='trash alternate outline'
                                            color="blue"
                                            style={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => handleDeleteCurrencyPair(user.activeGraphs, index, props)}
                                        />
                                    )
                                }

                            </Segment>
                        ))
                    )
            }
        </div>
    );
}

function renderAlertsGraph(alertsGraph) {
    const graphWidth = (window.innerWidth / 100) * 52;

    let domain = [];

    if (alertsGraph && alertsGraph.length) {
        let min = alertsGraph[0].alerts;
        let max = alertsGraph[0].alerts;
    
        alertsGraph.forEach(alert => {
            if (min > alert.alerts) {
                min = alert.alerts;
            }
    
            if (max < alert.alerts) {
                max = alert.alerts;
            }
        });
        domain = [min - 1, max + 1];
    }

    return (
        <Segment
            css={styles.chartCard}
            style={{
                marginTop: 20,
                width: '68%',
                height: 250,
                float: 'right',
                marginRight: 30,
                backgroundColor: '#131633',
                color: '#b1b1b5',
            }}
        >
            <div css={alertsGraph.length === 0 ? css`filter: blur(5px);` : ''}>
                <div css={css`${styles.chartData}`} style={{ marginTop: 10 }}>
                    <h2>Alerts History</h2>
                </div>
                <AreaChart
                    width={graphWidth}
                    height={180}
                    data={alertsGraph.length ? alertsGraph : ALERT_SIGNAL_HISTORY_DEMO}
                    style={{ bottom: 0, borderRadius: 10, bottom: 0 }}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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
                    <YAxis type="number" domain={domain} hide />
                </AreaChart>
            </div>
            {alertsGraph.length === 0 && (
                <h2
                    style={{
                        position: 'absolute',
                        color: '#b1b1b5',
                        fontWeight: 'bold',
                        marginTop: 0,
                    }}>No Data Available</h2>
            )
            }
        </Segment>
    );
}

function DashboardHome(props) {

    const { currencyGraphs, user, sidebar, dashboardCurrencyData, alertsGraph } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchCurrencyData());
    }, [user.activeGraphs && user.activeGraphs.length]);

    return (
        <div css={styles.container} style={{ marginRight: sidebar.sidebarOpen ? 0 : 30 }}>
            <Header />
            <Responsive minWidth={701}>
                <CustomSidebar />
                <div style={{ position: 'absolute', top: 100, right: 30,  }}>
                    <AddWidgets />
                </div>

                {renderCurrencyGraph({ currencyGraphs, isLoading: dashboardCurrencyData.isLoading }, props)}
                <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between', marginLeft: sidebar.sidebarOpen ? 310 : 200 }}>
                    {
                        user.alerts && (

                            <Segment style={{ width: '22%', height: 250, marginTop: 20, backgroundColor: '#131633' }}>
                                <h2 style={{ textAlign: 'center', color: '#b1b1b5' }}>Profile Summary</h2>
                                <div>
                                    <div
                                        style={{
                                            display: "flex",
                                            marginTop: 30,
                                            justifyContent: "space-between",
                                            color: '#b1b1b5'
                                        }}
                                    >
                                        <Icon name="bell" style={{ fontSize: 20, color: '#b1b1b5' }} />
                                        <p>Total Alerts</p>
                                        <p>-</p>
                                        <p>{user.alerts.length}</p>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            marginTop: 30,
                                            justifyContent: "space-between",
                                            color: '#b1b1b5'
                                        }}
                                    >
                                        <Icon name="mail forward" style={{ fontSize: 20, color: '#b1b1b5' }} />
                                        <p style={{ color: '#b1b1b5' }}>No of Followers</p>
                                        <p>-</p>
                                        <p>{user.followers.length}</p>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            marginTop: 30,
                                            justifyContent: "space-between",
                                            color: '#b1b1b5'
                                        }}
                                    >
                                        <Icon name="chart pie" style={{ fontSize: 20 }} />
                                        <p>Followed by You</p>
                                        <p>-</p>
                                        <p>{user.following.length}</p>
                                    </div>
                                </div>
                            </Segment>
                        )
                    }
                    {renderAlertsGraph(alertsGraph)}
                </div>
            </Responsive>
            <Responsive maxWidth={700}>
                <DashboardHomeMobile />
            </Responsive>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dashboardCurrencyData: state.dashboard,
    user: state.user,
    sidebar: state.sidebar,
    currencyGraphs: state.dashboard.currencyGraphs,
    alertsGraph: state.dashboard.alertsGraph,
});

export default connect(mapStateToProps)(DashboardHome);
