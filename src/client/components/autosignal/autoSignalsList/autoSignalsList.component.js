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

    return (
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
                autoSignalsList && autoSignalsList.signalsList.map((signal, index) => (
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

export default withRouter(connect(mapStateToProps)(AutoSignalsList));
