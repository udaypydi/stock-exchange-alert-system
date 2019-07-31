import React from 'react';
import { Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import styles from './followexperts.styles';

function FollowExperts(props) {

    function navigateToFollowExperts() {
        const { history } = props;
        history.push('/create-expert-signal');
    }

    return (
        <div>
             <Header />
             <CustomSidebar />
             <div css={styles.container}>
                <div css={styles.header}>
                    <p css={styles.title}>Follow Experts</p>
                    <Button 
                        basic 
                        color="blue" 
                        content='Create Expert Signals' 
                        icon={'add'}
                        labelPosition='left' 
                        onClick={navigateToFollowExperts}
                    />
                </div>
            </div>
        </div>
        
    );
}

export default withRouter(FollowExperts);
