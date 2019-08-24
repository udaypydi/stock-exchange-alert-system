import React, { useState, useEffect } from 'react';
import { Segment, Button, Divider, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { toggleLoadingStatus } from './autosignalform/autosignalform.action';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import styles from './expertsignalslist.styles';


function ExpertSignal(props) {
    const [isAutoSignalFormVisible, setisAutoSignalFormVisible] = useState(false);
    const [expertSignalList, setExpertSignalList] = useState([]);
    const { autoSignal, sidebar, autoSignalsList } = props;


    useEffect(() => {
        fetch('/get-expert-signals')
            .then(res => res.json())
            .then(json => {
                setExpertSignalList(json.expertSignals);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div style={{ backgroundColor: '#f0f2f5'}}>
            <Header />
            <CustomSidebar />
            <div css={styles.container} style={{ marginLeft: sidebar.sidebarOpen ? '23%' : '10%', marginTop: '10%' }}>
                <Segment 
                    fluid 
                    style={{ width: sidebar.sidebarOpen ? 1000 : 1200 }}
                >
                    <div>
                        <div css={styles.headerContainer}>
                            <div>
                                <p>Expert Signals</p>
                            </div>
                        </div>
                        <Divider />
                        <div style={{ marginTop: 30 }}>
                            <Segment 
                                css={styles.signalsHeaderContainer} 
                                style={{ backgroundColor: '#f8f8f8', padding: 10 }}
                                basic
                            >
                                <p css={styles.autoSignalCell}>Signal Name</p>
                                <p css={styles.autoSignalCell}>Trade Timeframe</p>
                                <p css={styles.autoSignalCell}>Signal Timeout</p>
                                <p css={styles.autoSignalCell}>Status</p>
                                <p css={styles.autoSignalCell}>Action</p>
                            </Segment>
                            {
                                expertSignalList && expertSignalList.map((signal, index) => (
                                    <Segment 
                                        css={styles.signalsHeaderContainer} 
                                        style={{ borderBottom: index !== signal.length - 1 ? '1px solid #ccc' : '', padding: 0 }}
                                        basic
                                    > 
                                        <p css={styles.autoSignalCell}>{signal.signalName}</p>
                                        <p css={styles.autoSignalCell}>{signal.timeFrame}</p>
                                        <p css={styles.autoSignalCell}>{signal.signalTimeFrame.timeOutHours} Hours</p>
                                        <div css={styles.autoSignalCell}><p css={styles.statusButton}>Pending</p></div>
                                        <div css={styles.autoSignalCell}>
                                            <Icon name="pencil" style={{ marginRight: 20 }} />
                                            <Icon 
                                                name="trash alternate outline" 
                                                color="red" 
                                                style={{ marginRight: 20 }} 
                                                onClick={() => handleDeleteSignals(index)}
                                            />
                                        </div>
                                    </Segment>
                                ))
                            }
                            {
                                expertSignalList.length === 0 && (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 200,
                                        textAlign: 'center'
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
                                        content='Create Expert Signals' 
                                        icon={'add'}
                                        labelPosition='left' 
                                        onClick={() => {
                                            const { history } = props;
                                            history.push('/create-expert-signal');
                                        }}
                                    />
                                </div>
                            )
                            }
                        </div>
                    </div>
                </Segment>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    autoSignal: state.autoSignal,
    sidebar: state.sidebar,
    autoSignalsList: state.autoSignalsList,
});

export default withRouter(connect(mapStateToProps)(ExpertSignal));
