import React, { Component, useState, useEffect } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { SIDEBAR_MENU, SIDEBAR_HEADER, DASHBOARD_ROUTE } from './customSideBar.constant';
import styles from './customSidebar.styles';

function CustomSideBar(props) {

    const [activeIndex, setActiveIndex] = useState(0);
    const { visible } = props;

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
        <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            vertical
            visible={visible}
            width='thin'
            style={{ color: '#fefefe', width: 250 }}
        >
            <p css={styles.sidebarHeader}>{SIDEBAR_HEADER}</p>
            {
                SIDEBAR_MENU.map((sidebarElement, index) => (
                    <Menu.Item 
                        style={{ 
                            backgroundColor: activeIndex === index ? '#e6faff' : '#ffffff'
                        }} 
                        onClick={() => handleRouteClick(sidebarElement.route, index)}
                    >
                        <div css={activeIndex === index ? styles.activeMenuItem : styles.menuItem}>
                            <Icon name={sidebarElement.iconName} style={{ marginLeft: 40 }} />
                            <p style={{ marginLeft: 20 }}>{sidebarElement.name}</p>
                        </div>
                    </Menu.Item>
                ))
            }
           
        </Sidebar>
    );
}


CustomSideBar.propTypes = {
    visible: PropTypes.bool.isRequired,
};

CustomSideBar.defaultProps = {
    visible: true,
};

export default withRouter(CustomSideBar);
