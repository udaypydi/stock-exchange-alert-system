import React, { Component } from 'react';
import { Segment, Image, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Header from 'commons/header/header.component';
import { updateUserProfilePic } from 'components/auth/auth.action';
import { profilePicUpload } from './myprofile.api';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import styles from './myprofile.styles';

class MyProfile extends Component {
    state = {
        imageUploadType: '',
    };

    handleProfilePicUpload = (key) => {
        this.setState({ imageUploadType: key}, () => {
            document.getElementById('profile-pic-uploader').click();
        });
    }

    handleImageUpload = (event) => {
        const { imageUploadType } = this.state;
        const { dispatch } = this.props;
        // const { targetElement, selectedImage } = this.state;
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            profilePicUpload({ data: reader.result, imageUploadType })
                .then(json => {
                    dispatch(updateUserProfilePic(json.profile_pic, imageUploadType));
                });
        }
        if (file) {
            reader.readAsDataURL(file); 
        }
        
    }

    render() {
        const { user } = this.props;

        return (
            <div style={{ height: window.innerHeight }}>
                <Header />
                <CustomSidebar />
                <Segment basic style={{ padding: 0, marginTop: 60, paddingTop: 10 }}>
                    <div css={styles.container}>
                        <div css={styles.imageContainer}>
                            {
                                user.bannerURL && (
                                    <div style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
                                         <Image 
                                            src={user.bannerURL} 
                                            style={{
                                                height: 260,
                                                width: '100%',
                                            }}
                                        />
                                    </div>
                                )
                            }
                            <div style={{ position: 'absolute', top: 30, right: 10 }}>
                                <Icon 
                                    name='edit' 
                                    color='#fff' 
                                    style={{ fontSize: 20 }}
                                    onClick={() => this.handleProfilePicUpload('banner')}
                                />
                            </div>
                            <Image 
                                src={user.profilePic || 'https://solarman.in/wp-content/themes/micron/images/placeholders/placeholder_large.jpg'} 
                                size='tiny' 
                                circular
                                style={{
                                    height: '100px',
                                    width: '100px',
                                }}
                                onClick={() => this.handleProfilePicUpload('profile')}
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
                                        user.followers && user.followers.map((follower) => (
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
                                        user.following && user.following.map((following) => (
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
