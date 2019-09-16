import React, { useEffect, useState } from 'react';
import { Segment, Icon, Responsive } from 'semantic-ui-react';
import CountUp from 'react-countup';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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
        <div 
            css={styles.chartsContainer} 
            style={{ 
                marginRight: 0,
                width: '70%',
                paddingLeft: sidebar.sidebarOpen ? 330 : 100
            }}
        >
            {
                currencyGraphs.length > 0 ? (
                    currencyGraphs.map((data, index) => (
                        <Segment
                            css={styles.chartCard}
                            style={{
                                marginTop: 0,
                                margin: 5,
                                height: 180,
                                width: 250,
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
                                                    width={250}
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
                                                        width={250}
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
                                    margin: 5,
                                    height: 180,
                                    width: 250,
                                    backgroundColor: '#131633'
                                }}
                                inverted
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
             <Segment
                css={styles.chartCard}
                style={{
                    marginTop: 0,
                    margin: 5,
                    height: 180,
                    width: 250,
                    backgroundColor: '#131633',
                    cursor: 'pointer'
                }}
            >
                <AddWidgets iconSize={30} />
            </Segment>
        </div>
    );
}

function renderLatestAlerts() {
    const [latestAlerts, setLatestAlerts] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            fetch('/get-all-alerts-data')
                .then(res => res.json())
                .then(json => {
                    setLatestAlerts(json.alerts)
                });
        }, 4000);
    },[latestAlerts.length]);

    return latestAlerts.map(alert => (
        <div 
            style={{ 
                backgroundColor: '#131633', 
                minHeight: 50, 
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                margin: 0,
                border: '1px solid #565e84', 
            }}>
            <p style={{ color: '#9c9fa6', marginBottom: 0 }}>{alert.currencyPair}</p>
            <p style={{ color: '#9c9fa6',  marginBottom: 0 }}>{alert.price || alert.buyPrice || alert.sellPrice}</p>
            {
                alert.buyPrice && (
                    <Icon name="arrow up" color="green" />
                )
            }
            {
                alert.sellPrice && (
                    <Icon name="arrow down" color="red" />
                )
            }
        </div>
    )
    );
}

function renderStatsBar(user) {
    const height = window.screen.availHeight;

    return (
    <div style={{ width: '20%', backgroundColor: '#131633', height, paddingTop: 100 }}>
        <div css={styles.statsContainer}>
            {/* <p css={styles.statsCount}>{user.followers.length}</p> */}
            <CountUp end={user.followers ? user.followers.length : 0} css={styles.statsCount} />
            <p css={styles.statsTitle}>FOLLOWERS</p>
        </div>
        <div css={styles.statsContainer}>
            {/* <p css={styles.statsCount}>{user.following.length}</p> */}
            <CountUp end={user.following ? user.following.length : 0} css={styles.statsCount} />
            <p css={styles.statsTitle}>FOLLOWING</p>
        </div>
        <div css={styles.statsContainer}>
            {/* <p css={styles.statsCount}>{user.alerts.length}</p> */}
            <CountUp end={user.alerts ? user.alerts.length : 0} css={styles.statsCount} />
            <p css={styles.statsTitle}>ALERTS</p>
        </div>
        <div 
            css={styles.statsContainer} 
            style={{ 
                border: '1px solid #565e84', 
                minHeight: height / 3 + 100, 
                maxHeight: height / 3 + 100,
                justifyContent: 'flex-start',
                overflow: 'auto',
                padding: 10,
            }}>
                 <p css={styles.statsTitle}>RECENT ALERTS</p>
                {renderLatestAlerts()}
        </div>
    </div>
    )
}

function DashboardHome(props) {

    const { currencyGraphs, user, sidebar, dashboardCurrencyData, alertsGraph } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchCurrencyData());
    }, [user.activeGraphs && user.activeGraphs.length]);

    return (
        <div css={styles.container} style={{ marginRight: sidebar.sidebarOpen ? 0 : 30 }}>
             <Helmet>
                <meta charSet="utf-8" />
                <title>Signalant - Dashboard</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Header />
            <Responsive minWidth={701}>
                <CustomSidebar />
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    {renderCurrencyGraph({ currencyGraphs, isLoading: dashboardCurrencyData.isLoading }, props)}
                    {renderStatsBar(user)}
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
