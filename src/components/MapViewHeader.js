import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Badge } from 'react-native-paper';
import { AQUWA_MARINE, DUSK, PINK_RED, RGB_161_161_181, WHITE } from '../helper/Color';
import { MEDIUM, REGULAR, SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import firestore from '@react-native-firebase/firestore';
import { CHAT_PATH } from '../service/api';
import { translate } from '../helper/Language';


class MapViewHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 20,
            badge: 0
        };
    }
    componentDidMount() {
        firestore()
            .collection(CHAT_PATH + 'Users')
            .doc(this.props.userId + '')
            .onSnapshot(qSnap => {
                const userDetail = qSnap._data
                if (userDetail) {
                    this.setState({
                        badge: (userDetail.total_badge_count ? userDetail.total_badge_count : 0)
                    })
                }
            }, err => {
                console.log("error while get status of user", err)
            })
    }

    render() {
        return (
            <View style={styles.overlayTop}>
                <SafeAreaView />
                <View style={{ flexDirection: 'row', alignItems: 'center' , justifyContent: 'space-between', }}>
                    <View style={{ height: 44, width: 44}} />
                        
                    
                    {

                        this.props.showRefreshBtn && <TouchableOpacity onPress={() => { this.props.onRefresh() }} activeOpacity={0.6}>
                            <View style={styles.refreshShadow}>
                                <Image
                                    style={{ alignSelf: 'center', resizeMode: 'contain', marginHorizontal: 8 }}
                                    source={require('../images/refresh.png')}
                                />
                                <Text style={styles.refreshMapText}>{translate("findPopupHere")}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                    {/* <View style={styles.notificatioView}> */}

                        {/* <Text style={styles.notificationText}> Your friend
                             <Text style={[GlobleStyles.font12RegularGrey, { color: AQUWA_MARINE, }]}> Carlos </Text>
                        joined</Text> */}

                    {/* </View> */}
                    <View>
                        <TouchableOpacity onPress={() => this.props.onPressChat()} activeOpacity={0.6}>


                            <Image
                                style={{ height: 44, width: 44, resizeMode: 'contain' }}
                                source={require('../images/chat.png')} />
                            {
                                this.state.badge > 0 && <Badge
                                    theme={{
                                        colors: {
                                            primary: WHITE
                                        },
                                        fonts: {
                                            regular: {
                                                fontFamily: MEDIUM
                                            }
                                        }
                                    }}
                                    style={{
                                        position: 'absolute',
                                    }}
                                >
                                    {this.state.badge}
                                </Badge>
                            }
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    overlayTop: {
        // position: 'absolute',
        marginHorizontal: 15,
        marginTop: 15
    },
    notificatioView: {
        flex: 1,
        paddingHorizontal: 6,
        paddingVertical: 15,
        backgroundColor: 'transparent',
        borderRadius: 50,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationText: {
        fontFamily: SEMI_BOLD,
        fontSize: normalize(12),
        color: DUSK,
        textAlign: 'center'
    },
    refreshShadow: {
        backgroundColor: "white",
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row'
    },
    refreshMapText : {
        fontFamily: REGULAR,
        fontSize: normalize(14),
        color: RGB_161_161_181,
        textAlign: 'center',
        marginVertical: 10,
        marginRight: 10
    }
})

export default MapViewHeader;
