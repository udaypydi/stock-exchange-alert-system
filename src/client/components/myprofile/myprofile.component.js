import React, { Component } from 'react';
import { Segment, Image } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import styles from './myprofile.styles';

class MyProfile extends Component {
    render() {
        return (
            <div style={{ height: window.innerHeight }}>
                <Header />
                <CustomSidebar />
                <Segment basic style={{ padding: 0, marginTop: 60, paddingTop: 10 }}>
                    <div css={styles.container}>
                        <div style={styles.imageContainer}>
                            <Image 
                                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXk-EoU6Kr37gwvVAOxsosdI2GvZD-7epQevo8dUshuwrLZO_2zw' 
                                size='tiny' 
                                circular
                                style={{
                                    height: '100px',
                                    width: '100px'
                                }}
                            />
                            <p>Trader</p>
                        </div>
                    
                    </div>
                </Segment>
            </div>
        );
    }
}

export default MyProfile;
