import React, { useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
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
import { CURRENCY_GRAPH_DATA } from './dashboardhome.constant';
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
                    <Segment css={styles.chartCard} style={{ marginTop: 0, borderRadius: 10 }} key={index}>
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
                                    {data[0].uv}
                                    </p>
                                    <p
                                    style={{ margin: 0, fontSize: 12, color: "rgba(0, 0, 0, 0.5) " }}
                                    >
                                    {CURRENCY_GRAPH_DATA[index].exchange}
                                    </p>
                                </div>
                                <p
                                    style={{
                                    marginTop: 25,
                                    fontSize: 20,
                                    color: "green",
                                    fontWeight: "bold"
                                    }}
                                >
                                    23%
                                </p>
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
                                                dataKey="uv"
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
                                            <Line dataKey="uv" stroke="#038FDE" dot={{stroke: '#FEA931', strokeWidth: 2}}/>
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

function DashboardHome(props) {

    const { dashboardCurrencyData } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchCurrencyData());
    }, []);

    return (
        <div css={styles.container}>
            <Header />
            <CustomSidebar />
            {renderCurrencyGraph(dashboardCurrencyData)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    dashboardCurrencyData: state.dashboard,
});

export default connect(mapStateToProps)(DashboardHome);
