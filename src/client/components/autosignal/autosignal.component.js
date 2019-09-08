import React, { useState, useEffect } from 'react';
import { Segment, Button, Divider, Responsive, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleLoadingStatus } from './autosignalform/autosignalform.action';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import AutoSignalForm from './autosignalform/autosignalform.component';
import AutoSignalsList from './autoSignalsList/autoSignalsList.component';
import AutoSignalMobile from './autoSignalsList/autoSignalList.mobile.component';
import styles from './autosignal.styles';

function AutoSignal(props) {
    const [isAutoSignalFormVisible, setisAutoSignalFormVisible] = useState(false);
    const { autoSignal, sidebar } = props;


    function showAutoSignalConfigurationForm() {
        const { history } = props;
        history.push('/auto-signals-create');
    }

    return (
        <div style={{ backgroundColor: '#222840'}}>
            <Header />
            <Responsive minWidth={701}>
                <CustomSidebar />
                <div css={styles.container} style={{ marginLeft: sidebar.sidebarOpen ? '65%' : '52%' }}>
                    <Segment 
                        fluid 
                        style={{
                            width: sidebar.sidebarOpen ? 1000 : 1200, 
                            backgroundColor: '#131633',
                            border: '1px solid #313452',
                        }}
                        basic
                    >
                        <div>
                            <div css={styles.headerContainer}>
                                <div>
                                    <h2 style={{ color: '#9c9fa6' }}>Indicator Signals</h2>
                                </div>
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
                            <Divider />
                            <AutoSignalsList />
                        </div>
                    </Segment>
                </div>
            </Responsive>
            <Responsive maxWidth={700}>
                {
                    sidebar.mobileSidebarOpen && (
                        <CustomSidebar />
                    )
                }
                <div>
                    <AutoSignalMobile />
                </div>
            </Responsive>
        </div>
    );
}

const mapStateToProps = (state) => ({
    autoSignal: state.autoSignal,
    sidebar: state.sidebar,
});

export default withRouter(connect(mapStateToProps)(AutoSignal));
