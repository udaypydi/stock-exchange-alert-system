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
                style={{ color: '#fefefe', width: 278 }}
            >
                <p css={styles.sidebarHeader}>{SIDEBAR_HEADER}</p>
                <div css={styles.profileImageContainer}>
                    <Image 
                        src={user.profilePic || 'https://solarman.in/wp-content/themes/micron/images/placeholders/placeholder_large.jpg'} 
                        size='tiny' 
                        circular
                        style={{
                            height: '50px',
                            width: '50px'
                        }}
                    />
                    <p css={styles.profileType}>{user.name}</p>
                </div>
                {
                    SIDEBAR_MENU.map((sidebarElement, index) => (
                        <Menu.Item 
                            style={{ 
                                backgroundColor: activeIndex === index ? '#e6faff' : '#ffffff',
                                borderRight: activeIndex === index ? '4px solid #038fde' : '0px',
                                borderBottom: 0,
                            }} 
                            onClick={() => handleRouteClick(sidebarElement.route, index)}
                        >
                            <div css={activeIndex === index ? styles.activeMenuItem : styles.menuItem}>
                                <Icon name={sidebarElement.iconName} style={{ marginLeft: 40, fontSize: 18 }} />
                                <p style={{ marginLeft: 20 }}>{sidebarElement.name}</p>
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
                style={{ color: '#fefefe', width: 80, overflow: 'hidden' }}
            >
                <p css={styles.sidebarHeader}>{SIDEBAR_HEADER}</p>
                <div css={styles.profileImageContainer}>
                    <Image 
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXk-EoU6Kr37gwvVAOxsosdI2GvZD-7epQevo8dUshuwrLZO_2zw' 
                        size='tiny' 
                        circular
                        style={{
                            height: '50px',
                            width: '50px'
                        }}
                    />
                </div>
                {
                    SIDEBAR_MENU.map((sidebarElement, index) => (
                        <Menu.Item 
                            style={{ 
                                backgroundColor: activeIndex === index ? '#e6faff' : '#ffffff',
                                borderRight: activeIndex === index ? '4px solid #038fde' : '0px',
                                borderBottom: 0,
                                width: 40,
                            }} 
                            onClick={() => handleRouteClick(sidebarElement.route, index)}
                        >
                            <div css={activeIndex === index ? styles.activeMenuItem : styles.menuItem}>
                                <Icon name={sidebarElement.iconName} style={{ marginLeft: 10, fontSize: 18 }} />
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
