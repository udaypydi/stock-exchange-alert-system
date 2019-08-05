import React, { useEffect, useState } from 'react';
import { Segment, Divider, Tab } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { getExpertAlerts } from './alerthistory.api';
import styles from './alerthistory.styles';


function ExpertAlerts(props) {

    const [pageCount, setPageCount] = useState(0);
    const [expertAlerts, setExpertAlerts] = useState([]);

    useEffect(() => {
        getExpertAlerts()
            .then(json => {
                setExpertAlerts(json.alerts);
            })
    }, []);

    return (
        <div>
            <div css={styles.container}>
                <Segment fluid style={{ width: 1000 }}>
                    <div>
                        <div style={{ marginTop: 30 }}>
                            <Segment 
                                css={styles.signalsHeaderContainer} 
                                style={{ backgroundColor: '#f8f8f8', padding: 10 }}
                                basic
                            >
                                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Currency Pair</p>
                                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Buy/Sell price with time</p>
                                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Created Time</p>
                                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Profit/Loss</p>
                                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Created By</p>
                            </Segment>
                            {
                                expertAlerts && [...expertAlerts].splice(10 * pageCount, 10).map((alert, index) => (
                                    <Segment 
                                        css={styles.signalsHeaderContainer} 
                                        style={{ borderBottom: index !== alert.length - 1 ? '1px solid #ccc' : '', padding: 0 }}
                                        basic
                                    > 
                                        <p css={styles.autoSignalCell}>{alert.currency_pair}</p>
                                        <p css={styles.autoSignalCell}>{alert.buy_sell_price}</p>
                                        <p css={styles.autoSignalCell}>{alert.created_time}</p>
                                        <p css={styles.autoSignalCell}>{alert.total_loss_profit}</p>
                                        <p css={styles.autoSignalCell}>{alert.email}</p>
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
                                            color: 'rgb(3, 143, 222)', 
                                            border: '1px solid rgb(3, 143, 222)'
                                        }}
                                    >{pageCount + 1}</p>
                                    {
                                        ((pageCount + 1) * 10 <= expertAlerts.length) && (
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    alerts: state.alerts,
});

export default connect(mapStateToProps)(ExpertAlerts);
