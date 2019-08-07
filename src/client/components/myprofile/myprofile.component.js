import React, { Component } from 'react';
import { Segment, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import { profilePicUpload } from './myprofile.api';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import styles from './myprofile.styles';

class MyProfile extends Component {
    
    state = {
        profile_pic: 'https://solarman.in/wp-content/themes/micron/images/placeholders/placeholder_large.jpg',
    };

    handleProfilePicUpload = () => {
        document.getElementById('profile-pic-uploader').click();
    }

    handleImageUpload = (event) => {
        // const { targetElement, selectedImage } = this.state;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            profilePicUpload({ data: reader.result})
                .then(json => {
                    this.setState({ profile_pic: json.profile_pic });
                });
        }
        if (file) {
            reader.readAsDataURL(file); 
        }
        
    }

    render() {
        const { user } = this.props;
        const { profile_pic } = this.state;

        return (
            <div style={{ height: window.innerHeight }}>
                <Header />
                <CustomSidebar />
                <Segment basic style={{ padding: 0, marginTop: 60, paddingTop: 10 }}>
                    <div css={styles.container}>
                        <div css={styles.imageContainer}>
                            <Image 
                                src={profile_pic} 
                                size='tiny' 
                                circular
                                style={{
                                    height: '100px',
                                    width: '100px',
                                }}
                                onClick={this.handleProfilePicUpload}
                            />
                            <input type="file" id="profile-pic-uploader" onChange={this.handleImageUpload} style={ { display: 'none' } } />
                            <p css={styles.traderName}>{user.name}</p>
                        </div>
                    </div>
                    <div 
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-evenly', 
                            marginLeft: 250,
                            marginTop: 0,
                        }}
                    >
                        <Segment style={{ width: 300, height: 150, marginTop: '-75px', marginBottom: 80 }} raised>
                            <div>
                                <p style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 0 }}>Email</p>
                                <p style={{ marginLeft: 20, marginTop: 5 }}>{user.email}</p>
                            </div>
                            <div>
                                <p style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Phone Number</p>
                                <p style={{ marginLeft: 20, marginBottom: 0  }}>-</p>
                            </div>
                        </Segment>
                        
                    </div>
                    <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-evenly', 
                            marginLeft: 250,
                        }}>
                        <Segment raised style={{ width: 300, padding: 0, height: 300, overflow: 'auto' }}>
                                <div style={{ backgroundColor: 'rgb(3, 143, 222)', color: '#ffffff', padding: 10 }}>
                                    <h1 style={{ textAlign: 'center' }}>Followers</h1>
                                </div>    
                                <div style={{ padding: 10 }}>
                                    {
                                        user.followers.map((follower) => (
                                            <p>{follower}</p>
                                        ))
                                    }
                                </div>
                        </Segment>
                        <Segment style={{ marginTop: 0, width: 300, padding: 0, height: 300, overflow: 'auto'  }} raised>
                                <div style={{ backgroundColor: 'rgb(3, 143, 222)', color: '#ffffff', padding: 10 }}>
                                    <h1 style={{ textAlign: 'center' }}>Following</h1>
                                </div>
                                
                                <div style={{ padding: 10 }}>
                                    {
                                        user.following.map((following) => (
                                            <p>{following}</p>
                                        ))
                                    }
                                </div>
                        </Segment>
                    </div>
                </Segment>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(MyProfile);
