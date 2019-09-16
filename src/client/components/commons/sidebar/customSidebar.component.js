import React, { Component, useState, useEffect } from 'react';
import { Sidebar, Menu, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { sideBarToggleStatus } from './customSideBar.constant';
import { SIDEBAR_MENU, SIDEBAR_HEADER, DASHBOARD_ROUTE } from './customSideBar.constant';
import styles from './customSidebar.styles';

function CustomSideBar(props) {

    const [activeIndex, setActiveIndex] = useState(0);
    const { visible , sideBar, user} = props;

    useEffect(() => {
        let index = DASHBOARD_ROUTE.indexOf(window.location.hash);
        if (index === -1) {
            switch (window.location.hash) {
                case '#/auto-signals-create':
                    index = 1;
                    break;
                
                case '#/create-expert-signal':
                    index = 2;
                    break;
                
                case '#/':
                    index = 0;
                    break;

                default:
                    break;
            }
        }
        console.log(index);
        setActiveIndex(index);
    }, []);

    function handleRouteClick(route, index) {
        const { history } = props;
        setActiveIndex(index);
        history.push(route);
    }

    return (
        <React.Fragment>
            <Sidebar
                as={Menu}
                icon='labeled'
                vertical
                visible={sideBar.sidebarOpen}
                width='thin'
                animation="push"
                style={{  backgroundColor: '#131633', color: '#656a8f', width: 278, zIndex: 99999 }}
            >
                <p css={styles.sidebarHeader}>{SIDEBAR_HEADER}</p>
                <div css={styles.profileImageContainer}>
                    {
                        user.name && (
                            <Image 
                                src={user.profilePic || require(`../../../assets/${user.name.split('')[0].toUpperCase()}-01.png`)}
                                size='tiny' 
                                circular
                                style={{
                                    height: '50px',
                                    width: '50px'
                                }}
                            />
                        )
                    }
                    <p css={styles.profileType}>{user.name}</p>
                </div>
                {
                    SIDEBAR_MENU.map((sidebarElement, index) => (
                        <Menu.Item 
                            style={{ 
                                backgroundColor: activeIndex === index ? '#191e3c' : '#131633',
                                borderRight: '0px',
                                borderBottom: 0,
                                padding: 0,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }} 
                            onClick={() => handleRouteClick(sidebarElement.route, index)}
                        >
                            <div css={activeIndex === index ? styles.activeMenuItem : styles.menuItem}>
                                <div style={{ display: 'flex' }}>
                                    <Icon name={sidebarElement.iconName} style={{ fontSize: 18, color: '#656a8f' }} />
                                    <p style={{ marginBottom : 0, marginLeft: 20 }}>{sidebarElement.name}</p>
                                </div>
                                <Icon name={'angle right'} style={{ fontSize: 18, color: '#656a8f' }} />
                            </div>
                        </Menu.Item>
                    ))
                }
            </Sidebar>
            <Sidebar
                as={Menu}
                icon='labeled'
                vertical
                visible={!sideBar.sidebarOpen}
                width='thin'
                animation="push"
                style={{ color: '#656a8f', backgroundColor: '#131633', width: 80, overflow: 'hidden', zIndex: 99999 }}
            >
                <p css={styles.sidebarHeader}>{SIDEBAR_HEADER}</p>
                <div css={styles.profileImageContainer}>
                    {
                        user.name && (
                            <Image 
                                src={user.profilePic || require(`../../../assets/${user.name.split('')[0].toUpperCase()}-01.png`)}
                                size='tiny' 
                                circular
                                style={{
                                    height: '50px',
                                    width: '50px'
                                }}
                            />
                        )
                    }
                    
                </div>
                {
                    SIDEBAR_MENU.map((sidebarElement, index) => (
                        <Menu.Item 
                            style={{ 
                                backgroundColor: activeIndex === index ? '#191e3c' : '#131633',
                                borderRight: '0px',
                                borderBottom: 0,
                                width: 40,
                                padding: 0,
                            }} 
                            onClick={() => handleRouteClick(sidebarElement.route, index)}
                        >
                            <div css={activeIndex === index ? styles.activeMenuItem : styles.menuItem}>
                                <Icon name={sidebarElement.iconName} style={{ fontSize: 18, color: 'rgb(101, 106, 143)' }} />
                            </div>
                        </Menu.Item>
                    ))
                }
            </Sidebar>
        </React.Fragment>
    );
}


CustomSideBar.propTypes = {
    visible: PropTypes.bool.isRequired,
};

CustomSideBar.defaultProps = {
    visible: true,
};

const mapStateToProps = (state) => ({
    sideBar: state.sidebar,
    user: state.user,
});

export default withRouter(connect(mapStateToProps)(CustomSideBar));
