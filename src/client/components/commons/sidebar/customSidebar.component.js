import React, { Component, useState } from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { SIDEBAR_MENU, SIDEBAR_HEADER } from './customSideBar.constant';
import styles from './customSidebar.styles';

function CustomSideBar(props) {

    const { visible } = props;

    function handleRouteClick(route) {
        const { history } = props;
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
        >
            <p css={styles.sidebarHeader}>{SIDEBAR_HEADER}</p>
            {
                SIDEBAR_MENU.map((sidebarElement) => (
                    <Menu.Item style={{ color: '#038fde' }} onClick={() => handleRouteClick(sidebarElement.route)}>
                        <Icon name={sidebarElement.iconName} />
                        {sidebarElement.name}
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
