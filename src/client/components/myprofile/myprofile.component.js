import React, { Component } from 'react';
import { Segment, Image, Icon, Divider, Button, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { sideBarToggleStatus } from 'commons/sidebar/customSidebar.action';
import Header from 'commons/header/header.component';
import { updateUserProfilePic } from 'components/auth/auth.action';
import { profilePicUpload } from './myprofile.api';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { expertsFollow } from 'components/followexperts/followexperts.action';
import MyProfileMobile from './myprofile.mobile.component';
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
                <Responsive minWidth={701}>
                <div>
                    <Header />
                    <CustomSidebar />
                    <div>
                    <img
                        height={300}
                        width={1600}
                        src={user.bannerURL}
                        onClick={() => this.handleProfilePicUpload('banner')}
                    />
                    <img
                        height={150}
                        width={150}
                        style={{
                            position: "absolute",
                            left: 50,
                            top: 250,
                            borderRadius: "50%",
                            zIndex: 9999,
                            marginLeft: sidebar.sidebarOpen ? 240 : 120,
                        }}
                        onClick={() => this.handleProfilePicUpload('profile')}
                        src={user.profilePic}
                    />
                <Segment
                    style={{
                    marginTop: "-10px",
                    height: 80,
                    display: "flex",
                    justifyContent: "center"
                    }}
                    raised
                >
                    <div
                    style={{
                        marginLeft: 30,
                        paddingRight: 20,
                        borderRight: "1px solid #ccc"
                    }}
                    >
                    <p
                        style={{
                        fontSize: 18,
                        margin: 0,
                        fontWeight: 700,
                        color: "#2566e8"
                        }}
                    >
                        Followers
                    </p>
                    <p style={{ fontWeight: 700 }}>{user.followers.length}</p>
                    </div>
                    <div
                    style={{
                        marginLeft: 30,
                        paddingRight: 20,
                        borderRight: "1px solid #ccc"
                    }}
                    >
                    <p
                        style={{
                        fontSize: 18,
                        margin: 0,
                        fontWeight: 700,
                        color: "#2566e8"
                        }}
                    >
                        Following
                    </p>
                    <p style={{ fontWeight: 700 }}>{user.following.length}</p>
                    </div>
                    <div style={{ marginLeft: 30 }}>
                    <p
                        style={{
                        fontSize: 18,
                        margin: 0,
                        fontWeight: 700,
                        color: "#2566e8"
                        }}
                    >
                        Alerts
                    </p>
                    <p style={{ fontWeight: 700 }}>250</p>
                    </div>
                </Segment>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginLeft: sidebar.sidebarOpen ? 240 : 120,
                    }}
                >
                    <div
                    style={{
                        marginTop: 50,
                        marginLeft: 30,
                        width: 200,
                        borderRight: "1px solid #cccccc",
                        textAlign: "center"
                    }}
                    >
                    <p style={{ fontSize: 20, fontWeight: "bold" }}>{user.name}</p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            fontSize: 17,
                            margin: 10,
                            marginLeft: 20
                        }}
                    >
                        <Icon name="mail" />
                        <p>{user.email}</p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            fontSize: 17,
                            margin: 10,
                            marginLeft: 20
                        }}
                    >
                        <Icon name="point" />
                        <p>India</p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            fontSize: 17,
                            margin: 10,
                            marginLeft: 20
                        }}
                    >
                        <Icon name="call" />
                        <p>-</p>
                    </div>
                    </div>
                    <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        flex: 1,
                        marginTop: 40
                    }}
                    >
                    <Segment
                        style={{
                        width: 300,
                        height: 300,
                        marginRight: 20,
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
                            marginRight: 20,
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
                                    <Button primary inverted  onClick={() => this.handleFollowExpert(trader)}>
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
                            marginRight: 20,
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
                        </div>
                    </div>
                    </div>
                    <input type="file" id="profile-pic-uploader" onChange={this.handleImageUpload} style={ { display: 'none' } } />
                </div>
                </Responsive>
              <Responsive maxWidth={700}>
                   <MyProfileMobile />
              </Responsive>
            </React.Fragment>
           
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user,
    sidebar: state.sidebar,
});

export default connect(mapStateToProps)(MyProfile);
