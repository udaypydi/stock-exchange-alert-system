import React, { useEffect, useState } from 'react';
import { Segment, Divider } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { fetchAlertsHistory } from './alerthistory.action';
import styles from './alerthistory.styles';

function AlerstHistory(props) {

    const [pageCount, setPageCount] = useState(0);
    const { alerts } = props;

    useEffect(() => {
        const { dispatch } = props;
        dispatch(fetchAlertsHistory());
    }, []);

    return (
        <div>
            <Header />
            <CustomSidebar />
            <div css={styles.container}>
                <Segment fluid style={{ width: 1000 }}>
                    <div>
                        <div css={styles.headerContainer}>
                            <div>
                                <p>Alerts History</p>
                            </div>
                        </div>
                        <Divider />
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
                                <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Auto Signals</p>
                            </Segment>
                            {
                                alerts && [...alerts].splice(10 * pageCount, 10).map((alert, index) => (
                                    <Segment 
                                        css={styles.signalsHeaderContainer} 
                                        style={{ borderBottom: index !== alert.length - 1 ? '1px solid #ccc' : '', padding: 0 }}
                                        basic
                                    > 
                                        <p css={styles.autoSignalCell}>{alert.currencyPair}</p>
                                        <p css={styles.autoSignalCell}>1.111</p>
                                        <p css={styles.autoSignalCell}>{alert.created_at}</p>
                                        <p css={styles.autoSignalCell}>0</p>
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
                                            color: 'rgb(3, 143, 222)', 
                                            border: '1px solid rgb(3, 143, 222)'
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
        </div>
    )
}

const mapStateToProps = (state) => ({
    alerts: state.alerts,
});

export default connect(mapStateToProps)(AlerstHistory);
