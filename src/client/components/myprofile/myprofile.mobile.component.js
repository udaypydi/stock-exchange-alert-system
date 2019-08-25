import React, { Component } from 'react';
import { Segment, Image, Icon, Divider, Button, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { sideBarToggleStatus } from 'commons/sidebar/customSidebar.action';
import Header from 'commons/header/header.component';
import { updateUserProfilePic } from 'components/auth/auth.action';
import { profilePicUpload } from './myprofile.api';
import { expertsFollow } from 'components/followexperts/followexperts.action';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import styles from './myprofile.styles';

class MyProfile extends Component {
    state = {
        imageUploadType: '',
    };


    componentDidMount() {
        const { dispatch } = this.props;
        if (window.screen.availWidth > 700) {
            dispatch(sideBarToggleStatus());
        }

    }


    handleFollowExpert = (email) => {
        const { dispatch } = this.props;
        dispatch(expertsFollow(email));
    }

    handleProfilePicUpload = (key) => {
        this.setState({ imageUploadType: key }, () => {
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

    renderNoData = () => (
        <div css={styles.nodatafound}>
            <Icon name="database" style={{ fontSize: 40 }} color="blue" />
            <p style={{ fontSize: 20, fontWeight: 'bold' }}>No Data Found</p>
        </div>
    );

    render() {
        const { user, sidebar } = this.props;

        return (
            <React.Fragment>
                <Header />
                {
                    sidebar.mobileSidebarOpen && (
                        <CustomSidebar />
                    )
                }
                <div style={{ height: 400 }}>
                    <img
                        height={300}
                        width={window.screen.availWidth}
                        src={user.bannerURL || 'https://www.sharekhan.com/MediaGalary/image/MTOnewdesignkolkata_banner-201908091219224068142.jpg'}
                        style={{ position: 'absolute' }}
                        onClick={() => this.handleProfilePicUpload('banner')}
                    />
                    <img
                        height={120}
                        width={120}
                        style={{
                            position: "absolute",
                            top: 240,
                            borderRadius: "50%",
                            left: 10,
                        }}
                        onClick={() => this.handleProfilePicUpload('profile')}
                        src={user.profilePic || 'https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/512/Spy_user_agent_webroot_undercover_sweeper.png'}
                    />
                </div>
                <div 
                    style={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        flexDirection: 'column' 
                    }}>
                    <Segment
                        style={{
                            width: 300,
                            height: 300,
                            padding: 0,
                            borderRadius: 5
                        }}
                        raised
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#2566e8",
                                height: 50,
                                width: "100%",
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }}
                        >
                            <p
                                style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}
                            >
                                Followers
                        </p>
                        </div>
                        <div style={{ height: 250, overflow: "auto", padding: 5 }}>
                            {user.followers.map(trader => (
                                <React.Fragment>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            marginBottom: 10
                                        }}
                                    >
                                        <img
                                            src={trader.icon || 'https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png'}
                                            style={{
                                                height: 50,
                                                width: 50,
                                                borderRadius: "50%",
                                                marginLeft: 20
                                            }}
                                        />
                                        <p style={{ marginLeft: 50 }}>{trader.name}</p>
                                    </div>
                                    <Divider />
                                </React.Fragment>
                            ))}
                            {
                                user.followers.length === 0 && (
                                    this.renderNoData()
                                )
                            }
                        </div>
                    </Segment>
                    <Segment
                        style={{
                            width: 300,
                            height: 300,
                            padding: 0,
                            borderRadius: 5,
                            marginTop: 0
                        }}
                        raised
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#2566e8",
                                height: 50,
                                width: "100%",
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }}
                        >
                            <p
                                style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}
                            >
                                Following
                            </p>
                        </div>
                        <div style={{ height: 250, overflow: "auto", padding: 5 }}>
                            {user.following.map(trader => (
                                <React.Fragment>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: 10
                                        }}
                                    >
                                        <img
                                            src={trader.icon || 'https://cdn4.iconfinder.com/data/icons/documents-letters-and-stationery/400/doc-14-512.png'}
                                            style={{ height: 50, width: 50, borderRadius: "50%" }}
                                        />
                                        <p>{trader}</p>
                                        <Button primary inverted onClick={() => this.handleFollowExpert(trader)}>
                                            Unfollow
                                    </Button>
                                    </div>
                                    <Divider />
                                </React.Fragment>
                            ))}
                              {
                                    user.following.length === 0 && (
                                        this.renderNoData()
                                    )
                              }
                        </div>
                    </Segment>
                    <Segment
                        style={{
                            width: 300,
                            height: 300,
                            padding: 0,
                            borderRadius: 5,
                            marginTop: 0
                        }}
                        raised
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#2566e8",
                                height: 50,
                                width: "100%",
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5
                            }}
                        >
                            <p
                                style={{ color: "#ffffff", fontWeight: "bold", fontSize: 20 }}
                            >
                                Alerts
                            </p>
                        </div>
                    </Segment>
                    <input type="file" id="profile-pic-uploader" onChange={this.handleImageUpload} style={ { display: 'none' } } />
                </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    sidebar: state.sidebar,
});

export default connect(mapStateToProps)(MyProfile);
