import React, { useEffect, useState } from 'react';
import { Button, Segment, Image, Icon, Responsive } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import { fetchExperts } from './followexperts.api';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { expertsFollow } from './followexperts.action';
import styles from './followexperts.styles';


function FollowExpertsMobile(props) {
    const [experts, setExperts] = useState([]);
    const { sidebar } = props;


    useEffect(() => {
        fetchExperts()
            .then(json => {
                setExperts(json.experts);
            });
    }, [props.user.following]);


    function navigateToFollowExperts() {
        const { history } = props;
        history.push('/create-expert-signal');
    }

    function handleFollowExpert(email) {
        const { dispatch } = props;
        dispatch(expertsFollow(email));
    }

    function renderExpertsCards() {
        const { user } = props;
        return experts.map(expert => (
            <Segment 
                raised 
                style={{ 
                    width: '90%', 
                    padding: 0, 
                    borderRadius: 10, 
                    marginTop: 20, 
                    maxHeight: 327 ,
                }}>
                <img 
                    src={expert.banner_url} 
                    css={styles.cardImage}
                />
                <div>
                    <Image 
                        src={expert.profile_pic} 
                        style={{
                            borderRadius: 10,
                            height: 60,
                            width: 60,
                            marginTop: '-40px',
                            marginLeft: 20,
                        }}
                    />
                    <div css={styles.nameContainer}>
                        <p style={{ width: 100, marginLeft: 10 }}>{expert.email}</p>
                        <div css={styles.followProfileContainer}>
                            <Button 
                                inverted 
                                color='blue' 
                                content={user.following.indexOf(expert.email) !== -1 ? 'Unfollow' : 'Follow'}
                                disabled={expert.email === user.email}
                                onClick={() => handleFollowExpert(expert.email)}
                            />
                        </div>
                    </div>
                    <div css={styles.dataContainer}>
                        <div css={styles.stats}>
                            <p css={styles.statTitle}>{expert.followers.length}</p>
                            <p style={{ fontSize: 12, color: '#8c8c8c' }}>Followers</p>
                        </div>
                        
                        <div css={styles.stats}>
                            <p css={styles.statTitle}>97%</p>
                            <p style={{ fontSize: 12, color: '#8c8c8c' }}>Success ratio</p>
                        </div>
                        <div css={styles.stats} style={{ border: 0 }}>
                            <p css={styles.statTitle}>{(new Date(expert.created_at)).getFullYear()}</p>
                            <p style={{ fontSize: 12, color: '#8c8c8c' }}>Member Since</p>
                        </div>
                    </div>
                </div>
            </Segment>
        ))
    }

    return (

        <div>
            <Header />
            {
                sidebar.mobileSidebarOpen && (
                    <CustomSidebar />
                )
            }

            <div style={{ margin: 10 }}>
                <p css={styles.title}>Follow Experts</p>
                <div css={styles.header}>
                    <div style={{ display: 'flex', marginTop: 20 }}>
                        <Button 
                            basic 
                            color="blue" 
                            content='Create Expert Signals' 
                            icon={'add'}
                            labelPosition='left' 
                            onClick={navigateToFollowExperts}
                        />
                        <Button 
                            basic 
                            color="blue" 
                            content='My Expert Signals' 
                            icon={'list'}
                            labelPosition='left' 
                            onClick={() => {
                                const { history } = props;
                                history.push('/expert-signal-list');
                            }}
                            style={{ marginLeft: 20 }}
                        />
                    </div>   
                </div>
                {
                    experts.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {renderExpertsCards()}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
    sidebar: state.sidebar,
});

export default withRouter(connect(mapStateToProps)(FollowExpertsMobile));
