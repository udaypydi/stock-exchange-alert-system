import React from 'react';
import { Icon } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styles from './header.styles';

function Header() {
    return (
        <div css={styles.headerContainer}>
            <div css={styles.titleContainer}>
                <Icon css={styles.sidebarIcon} name="outdent" />
                <p css={styles.companyName}>Signalant</p>
            </div>
            <Icon 
                css={styles.sidebarIcon} 
                name="shutdown" 
                color="blue"
                style={{ fontSize: 22 }}
            />
        </div>
    )
}

export default Header;
