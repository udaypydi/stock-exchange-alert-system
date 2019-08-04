import React from 'react';
import { Button, Segment, Image } from 'semantic-ui-react';
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

    function renderExpertsCards() {
        return (
            <Segment raised style={{ width: '32%', padding: 0, borderRadius: 10 }}>
                <img 
                    src="http://2.bp.blogspot.com/-EVBRY_NGNT0/VgKSHqkhXaI/AAAAAAAAAHo/E3Qnfco9pUg/s1600/banner2.jpg" 
                    css={styles.cardImage}
                />
                <div>
                    <Image 
                        src="http://sfwallpaper.com/images/profile-pictures-7.jpg" 
                        style={{
                            borderRadius: 10,
                            height: 60,
                            width: 60,
                            marginTop: '-40px',
                            marginLeft: 20,
                        }}
                    />
                    <div css={styles.nameContainer}>
                        <p style={{ width: 100, marginLeft: 10 }}>Lany Ceepar</p>
                        <div css={styles.followProfileContainer}>
                            <Button inverted color='blue' content="Profile" />
                            <Button inverted color='blue' content="Follow" />
                        </div>
                    </div>
                    <div css={styles.dataContainer}>
                        <div css={styles.stats}>
                            <p css={styles.statTitle}>122</p>
                            <p style={{ fontSize: 12, color: '#8c8c8c' }}>Followers</p>
                        </div>
                        
                        <div css={styles.stats}>
                            <p css={styles.statTitle}>97%</p>
                            <p style={{ fontSize: 12, color: '#8c8c8c' }}>Success ratio</p>
                        </div>
                        <div css={styles.stats} style={{ border: 0 }}>
                            <p css={styles.statTitle}>2018</p>
                            <p style={{ fontSize: 12, color: '#8c8c8c' }}>Member Since</p>
                        </div>
                    </div>
                </div>
            </Segment>
        )
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
                <div style={{ marginLeft: 300, marginTop: 30 }}>
                    {renderExpertsCards()}
                </div>
                
            </div>
        </div>
        
    );
}

export default withRouter(FollowExperts);
