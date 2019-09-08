import React, { useState, useEffect } from 'react';
import { Segment, Button, Divider, Icon, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { toggleLoadingStatus } from './autosignalform/autosignalform.action';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ExpertSignalsMobileList from './expertsignallist.mobile.component';
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
        <React.Fragment>
            <Responsive minWidth={701}>
                <div style={{ backgroundColor: '#222840' }}>
                    <Header />
                    <CustomSidebar />
                    <div css={styles.container} style={{ marginLeft: sidebar.sidebarOpen ? '23%' : '10%', marginTop: '10%' }}>
                        <Segment 
                            fluid 
                            style={{ 
                                width: sidebar.sidebarOpen ? 1000 : 1200,
                                backgroundColor: '#131633',
                                border: '1px solid #313452',
                            }}
                        >
                            <div>
                                <div css={styles.headerContainer}>
                                    <div>
                                        <h2 style={{ color: '#9c9fa6' }}>Expert Signals</h2>
                                    </div>
                                </div>
                                <Divider />
                                <div style={{ marginTop: 30 }}>
                                    <Segment 
                                        css={styles.signalsHeaderContainer} 
                                        style={{ backgroundColor: '#222840', padding: 10 }}
                                        basic
                                    >
                                        <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Signal Name</p>
                                        <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Currency Pair</p>
                                        <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Signal Timeout</p>
                                        <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Status</p>
                                        <p css={styles.autoSignalCell} style={{ fontWeight: 'bold' }}>Action</p>
                                    </Segment>
                                    {
                                        expertSignalList && expertSignalList.reverse().map((signal, index) => (
                                            <Segment 
                                                css={styles.signalsHeaderContainer} 
                                                style={{ borderBottom: index !== signal.length - 1 ? '1px solid #ccc' : '', padding: 0 }}
                                                basic
                                            > 
                                                <p css={styles.autoSignalCell}>{signal.signalName}</p>
                                                <p css={styles.autoSignalCell}>{signal.currencyPair}</p>
                                                <p css={styles.autoSignalCell}>1 Hours</p>
                                                <div css={styles.autoSignalCell}><p css={styles.statusButton}>ACTIVE</p></div>
                                                <div css={styles.autoSignalCell}>
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
                                                    history.push('/create-expert-signal');
                                                }}
                                            >
                                                <Icon name="plus" style={{ color: "rgb(64, 81, 137)" }} />
                                                <p>Create Expert Signal</p>
                                            </button>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </Segment>
                    </div>
                </div>
            </Responsive>
            <Responsive maxWidth={700}>
               <ExpertSignalsMobileList />
            </Responsive>
        </React.Fragment>
       
    );
}

const mapStateToProps = (state) => ({
    autoSignal: state.autoSignal,
    sidebar: state.sidebar,
    autoSignalsList: state.autoSignalsList,
});

export default withRouter(connect(mapStateToProps)(ExpertSignal));
