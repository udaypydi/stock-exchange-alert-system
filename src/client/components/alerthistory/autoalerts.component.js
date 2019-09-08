import React, { useEffect, useState } from 'react';
import { Segment, Divider, Tab } from 'semantic-ui-react';
import Moment from 'moment';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { fetchAlertsHistory } from './alerthistory.action';
import styles from './alerthistory.styles';


function AutoAlerts(props) {
    const { alerts } = props;
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchAlertsHistory());
    }, []);

    return (
        <div style={{ border: 0, backgroundColor: '#131633', }}>
            <Segment basic fluid style={{ border: 0, backgroundColor: '#131633', }}>
                <div>
                    <div style={{ marginTop: 30 }}>
                        <Segment 
                            css={styles.signalsHeaderContainer} 
                            style={{ backgroundColor: '#222840', padding: 10 }}
                            basic
                        >
                            <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Currency Pair</p>
                            <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Indicator Value</p>
                            <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Created Time</p>
                            <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Indicator</p>
                        </Segment>
                        {
                            alerts && [...alerts].splice(10 * pageCount, 10).map((alert, index) => (
                                <Segment 
                                    css={styles.signalsHeaderContainer} 
                                    style={{ borderBottom: index !== alert.length - 1 ? '1px solid #ccc' : '', padding: 0 }}
                                    basic
                                > 
                                    <p css={styles.autoSignalCell}>{alert.currencyPair}</p>
                                    <p css={styles.autoSignalCell}>{alert.indicator_value}</p>
                                    <p css={styles.autoSignalCell}>{Moment(alert.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                    <p css={styles.autoSignalCell}>{alert.indicator}</p>
                                </Segment>
                            ))
                        }
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ display: 'flex' }}>
                                {
                                    pageCount !== 0 && (
                                        <p css={styles.signalPaginationButtons} onClick={() => setPageCount(pageCount - 1)}>&lt;</p>
                                    )
                                }
                                <p 
                                    css={styles.signalPaginationButtons} 
                                    style={{ 
                                        color: 'rgb(64, 81, 137)',
                                        border: '1px solid rgb(64, 81, 137)'
                                    }}
                                >{pageCount + 1}</p>
                                {
                                    ((pageCount + 1) * 10 <= alerts.length) && (
                                        <p 
                                            css={styles.signalPaginationButtons}
                                            onClick={() => setPageCount(pageCount + 1)}
                                        >&gt;</p>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Segment>
        </div>
    )
}

const mapStateToProps = (state) => ({
    alerts: state.alerts,
});

export default connect(mapStateToProps)(AutoAlerts);
