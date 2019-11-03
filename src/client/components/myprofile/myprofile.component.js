import React, { Component } from 'react';
import { Segment, Image, Icon, Divider, Button, Responsive } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { sideBarToggleStatus } from 'commons/sidebar/customSidebar.action';
import Header from 'commons/header/header.component';
import { fetchAlertsCount } from 'components/dashboardhome/dashboardhome.api';
import { updateUserProfilePic } from 'components/auth/auth.action';
import { profilePicUpload, updateUserData } from './myprofile.api';
import CustomSidebar from 'commons/sidebar/customSidebar.component';
import { getUserState } from 'components/home/home.action';
import { expertsFollow } from 'components/followexperts/followexperts.action';
import MyProfileMobile from './myprofile.mobile.component';
import styles from './myprofile.styles';


function getAlertType(type) {
    if (type === 'PRICE_ALERTS') {
        return 'PA';
    }  
    
    if (type === 'INDICATOR_ALERTS') {
        return 'IA';
    }

    if (type === 'EXPERT_ALERTS') {
        return 'EA';
    }
}

class MyProfile extends Component {
    state = {
        imageUploadType: '',
        alerts: '-',
        formEdit: false,
        email: '',
        location: '',
        phoneNumber: '',
        latestAlerts: [],
    };

    _timer = null;

    componentDidMount() {
        const { dispatch } = this.props;
        if (window.screen.availWidth > 700) {
            // dispatch(sideBarToggleStatus());
            dispatch(getUserState());

            fetchAlertsCount()
                .then(res => {
                    this.setState({
                        alerts: res.alerts.length,
                    });
                });

            document.getElementById('location').addEventListener('input', (event) => {
                this.setState({ location: event.target.innerHTML });
            });

            document.getElementById('email').addEventListener('input', (event) => {
                this.setState({ email: event.target.innerHTML });
            });
        }
        this._timer = setInterval(() => {
            fetch('/get-all-alerts-data')
                .then(res => res.json())
                .then(json => {
                    this.setState({ latestAlerts: json.alerts });
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 1000);
    }

    componentWillMount() {
        clearInterval(this._timer);
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
            <Icon name="database" style={{ fontSize: 40, color: 'rgb(64, 81, 137)' }} />
            <p style={{ fontSize: 20, color: '#9c9fa6', fontWeight: 'bold' }}>No Data Found</p>
        </div>
    );

    renderUserProfile = (props) => {

        const { sidebar, user } = props;

        return (
            <Segment
                style={{
                    width: 400,
                    textAlign: "center",
                    position: "absolute",
                    left: 50,
                    top: 250,
                    marginLeft: sidebar.sidebarOpen ? 240 : 60,
                    zIndex: 9999,
                    backgroundColor: '#131633',
                    border: '1px solid #34426f',
                    display: 'flex'
                }}
                raised
            >
                {
                    user.name && (
                        <img
                            height={150}
                            width={150}
                            style={{
                                borderRadius: "50%",
                                height: 100,
                                width: 100,
                            }}
                            onClick={() => this.handleProfilePicUpload('profile')}
                            src={user.profilePic || require(`../../assets/${user.name.split('')[0].toUpperCase()}-01.png`)}
                        />
                    )
                }

                <div style={{ flexDirection: 'column' }}>
                    {/* {
                        !this.state.formEdit && (
                            <Icon 
                                name="pencil"
                                style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: '#9c9fa6', }}
                                onClick={() => this.setState({ 
                                    formEdit: !this.state.formEdit,
                                })}
                            />
                        )
                    } */}
                    {
                        this.state.formEdit && (
                            <Icon
                                name="close"
                                style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer', color: '#9c9fa6', }}
                                onClick={() => this.setState({
                                    formEdit: !this.state.formEdit,
                                })}
                            />
                        )
                    }
                    <p style={{ fontSize: 20, fontWeight: "bold", color: '#9c9fa6', }}>{user.name}</p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            fontSize: 17,
                            margin: 10,
                            marginLeft: 20,
                            color: '#9c9fa6',
                        }}
                    >
                        <Icon name="mail" />
                        <p
                            style={{ width: 200 }}
                            id="email"
                        >{user.email}</p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            fontSize: 17,
                            margin: 10,
                            marginLeft: 20,
                            color: '#9c9fa6',
                        }}
                    >
                        <Icon name="point" />
                        <p
                            style={{
                                width: 200,
                                border: this.state.formEdit ? '1px solid #ccc' : '',
                                textAlign: 'left'
                            }}
                            id="location"
                            contentEditable={this.state.formEdit}
                        >{user.location}</p>
                    </div>
                    {
                        this.state.formEdit && (
                            <Button
                                style={{ background: '#00c689', color: '#fff', borderRadius: 0 }}
                                onClick={() => {
                                    updateUserData({
                                        email: this.state.email || user.email,
                                        location: this.state.location || user.location,
                                        phoneNumber: this.state.phoneNumber || user.phoneNumber,
                                    })
                                        .then(json => {
                                            this.setState({ formEdit: false });
                                        });
                                }}
                                color="#2666e8"
                            >
                                Save
                            </Button>
                        )
                    }
                </div>
            </Segment>
        )
    };

    render() {
        const { user, sidebar } = this.props;
        const { alerts, latestAlerts } = this.state;

        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Signalant - My Profile</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <Responsive minWidth={701}>
                    <div>
                        <Header />
                        <CustomSidebar />
                        <div>
                            <img
                                height={300}
                                width={1600}
                                src={user.bannerURL || 'https://hookagency.com/wp-content/uploads/2015/11/green-to-blue-ui-gradient-background.jpg'}
                                onClick={() => this.handleProfilePicUpload('banner')}
                            />
                            {this.renderUserProfile(this.props)}
                            <Segment
                                style={{
                                    marginTop: "-10px",
                                    height: 80,
                                    display: "flex",
                                    justifyContent: "center",
                                    backgroundColor: '#131633',
                                    border: '1px solid #313452',
                                }}
                                basic
                            >
                                <div
                                    style={{
                                        marginLeft: sidebar.sidebarOpen ? 300 : 30,
                                        paddingRight: 20,
                                        borderRight: "1px solid #ccc"
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: 18,
                                            margin: 0,
                                            fontWeight: 700,
                                            color: '#9c9fa6',
                                        }}
                                    >
                                        Followers
                    </p>
                                    <p style={{ fontWeight: 700, color: '#9c9fa6', }}>{user.followers.length}</p>
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
                                            color: '#9c9fa6',
                                        }}
                                    >
                                        Following
                    </p>
                                    <p style={{ fontWeight: 700, color: '#9c9fa6', }}>{user.following.length}</p>
                                </div>
                                <div style={{ marginLeft: 30 }}>
                                    <p
                                        style={{
                                            fontSize: 18,
                                            margin: 0,
                                            fontWeight: 700,
                                            color: '#9c9fa6',
                                        }}
                                    >
                                        Alerts
                    </p>
                                    <p style={{ fontWeight: 700, color: '#9c9fa6', }}>{alerts}</p>
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
                                        display: "flex",
                                        justifyContent: "center",
                                        flex: 1,
                                        marginTop: 40,
                                        marginLeft: 35,
                                    }}
                                >
                                    <Segment
                                        style={{
                                            width: 360,
                                            height: 400,
                                            marginRight: 20,
                                            padding: 0,
                                            borderRadius: 5,
                                            backgroundColor: '#131633',
                                            border: '1px solid #313452',
                                        }}
                                        raised
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                background: "#222840",
                                                height: 50,
                                                width: "100%",
                                                borderTopLeftRadius: 5,
                                                borderTopRightRadius: 5
                                            }}
                                        >
                                            <p
                                                style={{ color: '#9c9fa6', fontWeight: "bold", fontSize: 20 }}
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
                                            width: 360,
                                            height: 400,
                                            marginRight: 20,
                                            padding: 0,
                                            borderRadius: 5,
                                            marginTop: 0,
                                            backgroundColor: '#131633',
                                            border: '1px solid #313452',
                                        }}
                                        raised
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                background: "#222840",
                                                height: 50,
                                                width: "100%",
                                                borderTopLeftRadius: 5,
                                                borderTopRightRadius: 5
                                            }}
                                        >
                                            <p
                                                style={{ color: '#9c9fa6', fontWeight: "bold", fontSize: 20 }}
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
                                                        <p style={{ color: '#9c9fa6' }}>{trader}</p>
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
                                            width: 360,
                                            height: 400,
                                            marginRight: 20,
                                            padding: 0,
                                            borderRadius: 5,
                                            marginTop: 0,
                                            backgroundColor: '#131633',
                                            border: '1px solid #313452',
                                        }}
                                        raised
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                background: "#222840",
                                                height: 50,
                                                width: "100%",
                                                borderTopLeftRadius: 5,
                                                borderTopRightRadius: 5
                                            }}
                                        >
                                            <p
                                                style={{ color: '#9c9fa6', fontWeight: "bold", fontSize: 20 }}
                                            >
                                                Alerts
                            </p>
                                        </div>
                                        <div style={{ height: 250, overflow: "auto", padding: 5 }}>
                                            {latestAlerts.map(trader => (
                                                <React.Fragment>
                                                    <div
                                                        style={{
                                                            backgroundColor: '#131633',
                                                            minHeight: 50,
                                                            width: '100%',
                                                            display: 'flex',
                                                            justifyContent: 'space-evenly',
                                                            alignItems: 'center',
                                                            margin: 0,
                                                            border: '1px solid #565e84',
                                                        }}>
                                                        <span style={{ color: '#9c9fa6' }}>{getAlertType(alert.type)}</span>
                                                        <p style={{ color: '#9c9fa6', marginBottom: 0 }}>{alert.currencyPair || alert.currency_pair}</p>
                                                        <p style={{ color: '#9c9fa6', marginBottom: 0 }}>{alert.price || alert.buyPrice || alert.sellPrice}</p>
                                                        {
                                                            (alert.buyPrice || alert.alert_type === 'Price High') && (
                                                                <span style={{ color: 'green' }}>High</span>
                                                            )
                                                        }
                                                        {
                                                            (alert.sellPrice || alert.alert_type === 'Price Low') && (
                                                                <span style={{ color: 'red' }}>Low</span>
                                                            )
                                                        }
                                                    </div>
                                                </React.Fragment>
                                            ))}
                                            {
                                                latestAlerts.length === 0 && (
                                                    this.renderNoData()
                                                )
                                            }
                                        </div>
                                    </Segment>
                                </div>
                            </div>
                        </div>
                        <input type="file" id="profile-pic-uploader" accept=".jpg,.png,.jpeg" onChange={this.handleImageUpload} style={{ display: 'none' }} />
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
