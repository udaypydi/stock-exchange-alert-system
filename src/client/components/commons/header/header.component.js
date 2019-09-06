import React from 'react';
import { Icon, Responsive } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { connect } from 'react-redux';
import { sideBarToggleStatus, signOutUser } from './header.action';
import MobileHeader from './header.mobile.component';
import { COMPANY_LOGO } from './header.constant';
import styles from './header.styles';

const iconStyles = {
    fontSize: 20,
    marginLeft: 20,
    color: '#b1b1b5',
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
        <React.Fragment>
            <Responsive minWidth={701}>
                <div css={styles.headerContainer}>
                    <div css={styles.titleContainer}>
                        <Icon 
                            style={iconStyles}
                            name={sideBar.sidebarOpen ? "outdent" : 'indent'}  
                            onClick={handleSideBarToggle} 
                        />
                        {
                            sideBar.sidebarOpen && (
                                <p style={{ 
                                    fontWeight: 'bold', 
                                    fontSize: 40, 
                                    color: '#b1b1b5',
                                    marginLeft: 5,
                                    letterSpacing: 1,
                                }}>Signalant</p>
                            )
                        }    
                    </div>
                    <Icon 
                        css={styles.sidebarIcon} 
                        name="shutdown" 
                        color="white"
                        style={{ fontSize: 22, color: '#b1b1b5' }}
                        onClick={handleLogOut}
                    />
                </div>
            </Responsive>
            <Responsive maxWidth={700}>
                <MobileHeader />
            </Responsive>
        </React.Fragment>
        
    )
}

const mapStateToProps = (state) => ({
    sideBar: state.sidebar
});

export default connect(mapStateToProps)(Header);
