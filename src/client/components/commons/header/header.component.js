import React from 'react';
import { Icon } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { sideBarToggleStatus, signOutUser } from './header.action';
import { COMPANY_LOGO } from './header.constant';
import styles from './header.styles';

const iconStyles = {
    fontSize: 20,
    marginLeft: 20,
    color: '#545454',
};

function Header(props) {

    const { sideBar, dispatch } = props;

    function handleSideBarToggle() {
        dispatch(sideBarToggleStatus());
    }

    function handleLogOut() {
        dispatch(signOutUser());
    }
    
    return (
        <div css={styles.headerContainer}>
            <div css={styles.titleContainer}>
                <Icon style={iconStyles} name={sideBar.sidebarOpen ? "outdent" : 'indent'}  onClick={handleSideBarToggle} />
                {
                    sideBar.sidebarOpen && (
                        <img src={COMPANY_LOGO} height={47} style={{ marginLeft: 20 }} />
                    )
                }    
            </div>
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

export default connect(mapStateToProps)(Header);
