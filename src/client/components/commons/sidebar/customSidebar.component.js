import React, { Component, useState } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { SIDEBAR_MENU, SIDEBAR_HEADER } from './customSideBar.constant';
import styles from './customSidebar.styles';

function CustomSideBar(props) {

    const [activeIndex, setActiveIndex] = useState(0);
    const { visible } = props;

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
