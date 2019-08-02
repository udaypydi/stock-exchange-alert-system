import React from 'react';
import { Icon } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { COMPANY_LOGO } from './header.constant';
import styles from './header.styles';

function Header() {
    return (
        <div css={styles.headerContainer}>
            <div css={styles.titleContainer}>
                <Icon css={styles.sidebarIcon} name="outdent" />
                <img src={COMPANY_LOGO} height={47} />
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
