import React from 'react';
import { Icon } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { mobileSidebarToggleStatus, signOutUser } from './header.action';
import { COMPANY_LOGO } from './header.constant';
import styles from './header.styles';

const iconStyles = {
    fontSize: 20,
    marginLeft: 20,
    color: '#545454',
};

function MobileHeader(props) {

    const { sideBar, dispatch } = props;

    function handleSideBarToggle() {
        dispatch(mobileSidebarToggleStatus());
    }

    function handleLogOut() {
        dispatch(signOutUser());
    }
    
    return (
        <div css={styles.headerContainer} style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Icon style={iconStyles} name={sideBar.mobileSidebarOpen ? "outdent" : 'indent'}  onClick={handleSideBarToggle} />
            <img src={COMPANY_LOGO} height={47} />
            <Icon 
                css={styles.sidebarIcon} 
                name="shutdown" 
                color="blue"
                style={{ fontSize: 22 }}
                onClick={handleLogOut}
            />
        </div>
    )
}

const mapStateToProps = (state) => ({
    sideBar: state.sidebar
});

export default connect(mapStateToProps)(MobileHeader);
