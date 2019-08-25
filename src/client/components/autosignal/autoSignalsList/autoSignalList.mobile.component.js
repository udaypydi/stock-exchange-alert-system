import React, { useEffect } from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './autoSignalList.styles';
import { fetchAllAutoSignals, deleteSignalList } from './autoSignalsList.action';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Text,
    LineChart,
    Line
  } from "recharts";

const data = [
    { name: "Page A", uv: 100, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 100, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 150, pv: 2400, amt: 2400 }
  ];

function AutoSignalMobile(props) {

    const { autoSignalsList } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchAllAutoSignals());
    }, []);

    function handleDeleteSignals(index) {
        const { autoSignalsList, dispatch } = props;
        const { signalsList } = autoSignalsList;
        dispatch(deleteSignalList(signalsList[index]._id));
    }

    function renderSignalData(signalsList) {
        const signalsListArray = signalsList.map((signal, index) => (
            <Segment
                style={{
                width: 350,
                height: 250,
                margin: 20,
                padding: 0
                }}
                raised
            >
            <div
              style={{
                background: "rgba(4, 143, 222, 0.9)",
                height: 60,
                justifyContent: "space-between",
                alignItems: "center",
                display: "flex",
                color: "#ffffff",
                padding: 10,
              }}
            >
              <Icon name="pencil" style={{ fontSize: 20 }} color="#fff" />
              <p style={{ fontSize: 18, fontWeight: "bold", margin: 0 }}>
                {signal.signalName}
              </p>
              <Icon 
                name="trash" 
                style={{ fontSize: 20 }} 
                color="#fff"
                onClick={() => handleDeleteSignals(index)}
            />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: 20
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 'bold', color: 'rgba(4, 143, 222, 0.9)' }}>{signal.timeFrame}</p>
                <p>TIME FRAME</p>
              </div>
    
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 'bold', color: 'rgba(4, 143, 222, 0.9)' }}>{signal.signalTimeFrame.timeOutHours}</p>
                <p>TIME OUT</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p css={styles.statusButton} style={{ marginBottom: 8 }}>ACTIVE</p>
                <p>STATUS</p>
              </div>
            </div>
            <AreaChart
              width={349}
              height={75}
              data={data}
              style={{ position: "absolute", bottom: 0, borderRadius: 10 }}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs style={{ borderRadius: 10 }}>
                <linearGradient id={`colorUv-0`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={"#4ECDE4"} stopOpacity={0.9} />
                  <stop offset="95%" stopColor={"#06BB8A"} stopOpacity={0.9} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                strokeWidth={0}
                stroke="#4D95F3"
                type="monotone"
                dataKey="uv"
                stroke={"#06BB8A"}
                fill={`url(#colorUv-0)`}
                fillOpacity={1}
              />
              <YAxis type="number" domain={[1, 2]} hide />
            </AreaChart>
          </Segment>
        ));
        return signalsListArray;
    }
    
    return (
        <div>
            {
                autoSignalsList.signalsList.length > 0 ? (
                    <div 
                        style={{ 
                            marginTop: 100, 
                            marginLeft: 10, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center' 
                        }}>
                         <Button 
                            basic 
                            color="blue"
                            content='Create Indicator Signals' 
                            icon={'add'}
                            labelPosition='left' 
                            onClick={() => {
                                const { history } = props;
                                history.push('/auto-signals-create');
                            }}
                        />
                        {renderSignalData(autoSignalsList.signalsList)}
                    </div>
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 200,
                            textAlign: 'center',
                            marginTop: 200,
                        }}
                    >
                        <Icon 
                            name='database'
                            color='blue'
                            style={{ 
                                fontSize: 40,
                            }}
                        />
                        <h2 style={{ marginTop: 0 }}>No Data Available</h2>
                        <Button 
                            basic 
                            color="blue"
                            content='Create Indicator Signals' 
                            icon={'add'}
                            labelPosition='left' 
                            onClick={() => {
                                const { history } = props;
                                history.push('/auto-signals-create');
                            }}
                        />
                    </div>
                )
            }
        </div>
    )
}


const mapStateToProps = (state) => ({
    autoSignalsList: state.autoSignalsList,
});

export default withRouter(connect(mapStateToProps)(AutoSignalMobile));
