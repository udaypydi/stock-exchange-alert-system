import React, { useEffect, useState } from 'react';
import { Segment, Divider, Tab } from 'semantic-ui-react';
import Moment from 'moment';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { getPriceAlerts } from './alerthistory.api';
import styles from './alerthistory.styles';


function PriceAlerts(props) {
    const [priceAlerts, setPriceAlerts] = useState([]);
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        getPriceAlerts()
            .then(json => {
                setPriceAlerts(json.alerts);
            });
    }, []);

    return (
        <div>
            <Segment basic fluid style={{ border: 0, backgroundColor: '#131633' }}>
                <div>
                    <div style={{ marginTop: 30 }}>
                        <Segment 
                            css={styles.signalsHeaderContainer} 
                            style={{ backgroundColor: '#222840', padding: 10 }}
                            basic
                        >
                            <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Currency Pair</p>
                            <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Price</p>
                            <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Created Time</p>
                            <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Alert Type</p>
                        </Segment>
                        {
                            priceAlerts && [...priceAlerts].splice(10 * pageCount, 10).map((alert, index) => (
                                <Segment 
                                    css={styles.signalsHeaderContainer} 
                                    style={{ borderBottom: index !== alert.length - 1 ? '1px solid #ccc' : '', padding: 0 }}
                                    basic
                                > 
                                    <p css={styles.autoSignalCell}>{alert.currency_pair}</p>
                                    <p css={styles.autoSignalCell}>{alert.price}</p>
                                    <p css={styles.autoSignalCell}>{Moment(alert.created_time).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                    <p css={styles.autoSignalCell}>{alert.alert_type}</p>
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
                                    ((pageCount + 1) * 10 <= priceAlerts.length) && (
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

export default connect(mapStateToProps)(PriceAlerts);
