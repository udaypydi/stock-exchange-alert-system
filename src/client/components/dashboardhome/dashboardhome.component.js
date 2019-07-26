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
    Text
  } from "recharts";
  /** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { CURRENCY_GRAPH_DATA } from './dashboardhome.constant';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { fetchCurrencyData, formatChartData } from './dashboardhome.action';
import styles from './dashboardhome.styles';

function renderCurrencyGraph(currencyData) {
    const { eurusd, usdjpy, usdgyd, audnzd } = currencyData;
    return (
        <div css={styles.chartsContainer}>
            {
                [eurusd, usdjpy, usdgyd, audnzd].map((data, index) => data.length && (
                    <div css={styles.chartCard}>
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
                        <AreaChart
                            width={300}
                            height={120}
                            data={data}
                            style={{ position: "absolute", bottom: 0 }}
                            >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="10%" stopColor={CURRENCY_GRAPH_DATA[index].colors[0]} stopOpacity={0.8} />
                                <stop offset="90%" stopColor={CURRENCY_GRAPH_DATA[index].colors[1]} stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="uv"
                                stroke="#8884d8"
                                fill="url(#colorUv)"
                            />
                            <YAxis type="number" domain={CURRENCY_GRAPH_DATA[index].domain} hide />
                        </AreaChart>
                    </div>
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
        <div>
            <CustomSidebar />
            {renderCurrencyGraph(dashboardCurrencyData)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    dashboardCurrencyData: state.dashboard,
});

export default connect(mapStateToProps)(DashboardHome);
