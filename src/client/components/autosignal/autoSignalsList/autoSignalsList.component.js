import React, { useEffect } from 'react';
import { Segment, Icon, Button } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllAutoSignals, deleteSignalList } from './autoSignalsList.action';
import styles from './autoSignalList.styles';
function AutoSignalsList(props) {

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

    function handleEditSignal(signal) {
        props.history.push(`/auto-signals-create?type=edit&id=${signal._id}`);
    }

    return (
        <div style={{ marginTop: 30 }}>
            <Segment 
                css={styles.signalsHeaderContainer} 
                style={{ backgroundColor: '#222840', padding: 10 }}
                basic
            >
                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Signal Name</p>
                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Trade Timeframe</p>
                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Signal Timeout</p>
                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Status</p>
                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Action</p>
            </Segment>
            {
                autoSignalsList && autoSignalsList.signalsList.map((signal, index) => (
                    <Segment 
                        css={styles.signalsHeaderContainer} 
                        style={{ 
                            borderBottom: index !== signal.length - 1 ? '1px solid #ccc' : '', 
                            padding: 0 
                        }}
                        basic
                    > 
                        <p css={styles.autoSignalCell}>{signal.signalName}</p>
                        <p css={styles.autoSignalCell}>{signal.timeFrame}</p>
                        <p css={styles.autoSignalCell}>{signal.signalTimeFrame.timeOutHours} Hours</p>
                        <div css={styles.autoSignalCell}><p css={styles.statusButton}>ACTIVE</p></div>
                        <div css={styles.autoSignalCell}>
                            <Icon 
                                name="edit" 
                                color="#656792" 
                                style={{ marginRight: 20, cursor: 'pointer' }} 
                                onClick={() => handleEditSignal(signal)}
                            />
                            <Icon 
                                name="trash alternate outline" 
                                color="red" 
                                style={{ marginRight: 20, cursor: 'pointer' }} 
                                onClick={() => handleDeleteSignals(index)}
                            />
                        </div>
                    </Segment>
                ))
            }
            {
                autoSignalsList.signalsList.length === 0 && (
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
                        style={{ 
                            fontSize: 40,
                            color: "rgb(64, 81, 137)",
                        }}
                    />
                    <h2 style={{ marginTop: 0, color: '#9c9fa6' }}>No Data Available</h2>
                     <button
                        style={{
                            border: "1px solid rgb(64, 81, 137)",
                            color: "rgb(64, 81, 137)",
                            backgroundColor: "transparent",
                            display: "flex",
                            padding: 10,
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            const { history } = props;
                            history.push('/auto-signals-create');
                        }}
                    >
                        <Icon name="plus" style={{ color: "rgb(64, 81, 137)" }} />
                        <p>Create Indicator Signals</p>
                    </button>
                </div>
            )
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    autoSignalsList: state.autoSignalsList,
});

export default withRouter(connect(mapStateToProps)(AutoSignalsList));
