import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Platform,
    StyleSheet,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { IconButton, Divider, Button } from "react-native-paper";
import {
    SILVER,
    BLACK,
    PINK_RED,
    BLACK_FOUR,
    WHITE,
} from "../helper/Color";
import GlobleStyles from "../helper/GlobleStyles";
import { normalize } from "../helper/FontSIze";
import { BOLD, MEDIUM, SEMI_BOLD, REGULAR } from "../helper/FontName";
import CustomButtonFlat from "../components/CustomButtonFlat";
import {
    buildDynamicLink,
    isDefaultDate,
    PriceType,
} from "../helper/Helper";
import ProgressiveImage from "../components/LoadImage";
import FastImage from "react-native-fast-image";
import { translate } from "../helper/Language";
import { connect } from "react-redux";
import moment from "moment";
import MapView, { Callout, PROVIDER_GOOGLE, Marker } from "react-native-maps";
import I18n from 'i18n-js';


class SimplePartyDetailTopHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objEventDetail: props.objEventDetail
        };
    }

    getEventTime() {
        let eventStartDate = this.state.objEventDetail.start_date;
        let eventEndDate = this.state.objEventDetail.end_date;
        let momentStartDate = moment(eventStartDate, "YYYY-MM-DDTHH:mm:ss");
        let momentEndDate = moment(eventEndDate, "YYYY-MM-DDTHH:mm:ss.000+0000");
        return (
            momentStartDate.format("HH:mm") +
            " - " +
            momentEndDate.format("HH:mm")
        );
    }

    getEventDate() {
        let eventStartDate = this.state.objEventDetail.start_date;
        let eventEndDate = this.state.objEventDetail.end_date;

        let momentStartDate = moment(eventStartDate, 'YYYY-MM-DDTHH:mm:ss');
        let momentEndDate = moment(eventEndDate, 'YYYY-MM-DDTHH:mm:ss');
        if (momentStartDate.isSame(moment(), "date") || momentStartDate.isSame(momentEndDate, 'date')) {
            return momentEndDate.local(I18n.currentLocale()).format('DD-MMM-YYYY');
        } else {
            return (
                momentStartDate.local(I18n.currentLocale()).format('DD-MMM-YYYY') +
                ' - ' +
                momentEndDate.local(I18n.currentLocale()).format('DD-MMM-YYYY')
            );
        }

    }

    getFavImage(isSelected) {
        if (isSelected) {
            return require("../images/like_selected.png");
        } else {
            return require("../images/like_unselect.png");
        }
    }

    getReportImage(isSelected) {
        if (isSelected) {
            return require("../images/block_selected.png");
        } else {
            return require("../images/block.png");
        }
    }

    getGoingAmnt() {
        let price_type = this.state.objEventDetail.price_type;
        if (price_type == PriceType.free) {
            return translate("participate");
        } else {
            return translate("Get_involved");
        }
    }

    renderMarker = () => (
        <View>
            <Marker
                reuseIdentifier={this.state.objEventDetail.id.toString()}
                key={this.state.objEventDetail.id.toString()}
                coordinate={{
                    latitude: this.state.objEventDetail.latitude,
                    longitude: this.state.objEventDetail.longitude,
                }}
            >
                <Image
                    source={require("../images/music_callout.png")}
                    style={{ width: 30, height: 35 }}
                />
            </Marker>
        </View>
    );

    render() {
        const {
            authData: { data },
        } = this.props;

        return (
            <View>
                <Text
                    style={[
                        GlobleStyles.font28MediumDusk,
                        {
                            marginHorizontal: 15,
                            marginTop: 15,
                        },
                    ]}
                    numberOfLines={2}
                    lineBreakMode={"tail"}
                >
                    {this.state.objEventDetail.title}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    marginHorizontal: 15,
                }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flex : 1,
                            }}
                        onPress={() => {
                            if (data.id != this.state.objEventDetail.host_id) {
                                Actions.otherUserProfile({
                                    userId: this.state.objEventDetail.host_id,
                                });
                            } else {
                                Actions.myProfile();
                            }
                        }}
                    >
                        <ProgressiveImage
                            style={{
                                height: 32,
                                width: 32,
                                resizeMode: "cover",
                                borderRadius: 14,
                            }}
                            source={{
                                uri: this.state.objEventDetail.host_profile_picture,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />

                        <View style={{ marginHorizontal: 10, flex : 1, }}>
                            <Text
                                style={{
                                    fontSize: normalize(12),
                                    fontFamily: MEDIUM,
                                    color: SILVER,
                                }}
                            >
                                {translate("Organizer")}
                            </Text>

                            <Text
                                style={GlobleStyles.font16RegularCharCoalGrey}
                                numberOfLines={1}
                            >
                                {this.state.objEventDetail.host_user_name == undefined
                                    ? this.state.objEventDetail.host_name
                                    : this.state.objEventDetail.host_user_name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginTop: 15,
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignSelf: 'flex-end',
                            marginLeft: 8
                        }}
                    >
                        {data.id != this.state.objEventDetail.host_id && (
                            <TouchableOpacity
                                style={{
                                    height: 40,
                                    width: 40,
                                    marginEnd: 10,
                                }}
                                onPress={() =>
                                    Actions.chatDetails({
                                        otherUser: this.state.objEventDetail.host_id,
                                    })
                                }
                            >
                                <Image
                                    style={{ height: 40, width: 40, resizeMode: "contain" }}
                                    source={require("../images/contact.png")}
                                />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={{ height: 40, width: 40, marginEnd: 10 }}
                            onPress={() => this.props.makeEventFavourite(!this.props.isFav)}
                        >
                            <Image
                                style={{ height: 40, width: 40, resizeMode: "contain" }}
                                source={this.getFavImage(this.props.isFav)}
                            />
                        </TouchableOpacity>
                        {(this.state.objEventDetail.host_id == data.id ||
                            this.state.objEventDetail.is_collaborator == true) && (
                                <TouchableOpacity
                                    style={{ height: 40, width: 40, marginEnd: 10 }}
                                    onPress={() => {
                                        buildDynamicLink(this.state.objEventDetail.id).then(
                                            (strUrl) => {
                                                // console.log(strUrl)
                                                this.props.onShareClick(strUrl);
                                            }
                                        );
                                    }}
                                >
                                    <Image
                                        style={{ height: 40, width: 40, resizeMode: "contain" }}
                                        source={require("../images/share.png")}
                                    />
                                </TouchableOpacity>
                            )}

                        {this.state.objEventDetail.host_id != data.id &&
                            this.state.objEventDetail.is_collaborator == false && (
                                <TouchableOpacity
                                    style={{ height: 40, width: 40 }}
                                    onPress={() => {
                                        this.props.onMoreClicked()
                                    }}
                                >
                                    <Image
                                        style={{ height: 40, width: 40, resizeMode: "contain" }}
                                        source={
                                            // this.getReportImage(this.state.isReported)
                                            require("../images/eventDetailMore.png")
                                        }
                                    />
                                </TouchableOpacity>
                            )}
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        // justifyContent: 'space-between',
                        marginTop: 15,
                        marginHorizontal: 15,
                    }}
                >
                    <View style={{
                        flex: 1,
                    }}>
                        {
                            (isDefaultDate(this.state.objEventDetail.end_date) == false) && <View>
                                <Text
                                    style={{
                                        fontSize: normalize(15),
                                        color: BLACK,
                                        fontFamily: SEMI_BOLD,
                                    }}
                                >{this.getEventDate()}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: normalize(13),
                                        color: BLACK,
                                        fontFamily: REGULAR,
                                        marginTop: 5
                                    }}
                                >{this.getEventTime()}
                                </Text>
                            </View>
                        }



                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                marginTop: 15,
                                alignItems: "center",
                            }}
                            onPress={() => {
                                const scheme = Platform.select({
                                    ios: "maps:0,0?q=",
                                    android: "geo:0,0?q=",
                                });
                                const latLng = `${this.state.objEventDetail.latitude},${this.state.objEventDetail.longitude
                                    }`;
                                const label = this.state.objEventDetail.location;
                                const url = Platform.select({
                                    ios: `${scheme}${label}@${latLng}`,
                                    android: `${scheme}${latLng}(${label})`,
                                });

                                Linking.openURL(url);
                            }}
                        >
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={{ height: 73, width: 90, borderRadius: 8 }}
                                scrollEnabled={false}
                                initialRegion={{
                                    latitude: this.state.objEventDetail.latitude,
                                    longitude: this.state.objEventDetail.longitude,
                                    latitudeDelta: 0.3,
                                    longitudeDelta: 0.3,
                                }}
                                // maxZoomLevel={15}
                                ref={(ref) => (this.mapView = ref)}
                            >
                                <this.renderMarker />
                            </MapView>

                            <View style={{ marginStart: 10, flex: 1 }}>
                                <Text
                                    style={
                                        {
                                            color: BLACK_FOUR,
                                            fontSize: normalize(15),
                                            fontFamily: BOLD,
                                        }}
                                >
                                    {this.state.objEventDetail.location}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                if (this.props.interesetedCnt > 0) {
                                    Actions.favouriteUserList({
                                        eventId: this.state.objEventDetail.id,
                                    });
                                }
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: 20,
                                    alignItems: "center",
                                }}
                            >
                                <IconButton
                                    icon={"heart"}
                                    size={25}
                                    style={{ margin: -5, padding: 0 }}
                                />

                                <Text
                                    style={
                                        {
                                            color: BLACK,
                                            marginStart: 8,
                                            fontFamily: BOLD,
                                            fontSize: normalize(13),
                                        }}
                                >
                                    {/* {this.props.interesetedCnt + translate("interested")} */}
                                    {this.props.interesetedCnt}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <TouchableOpacity
                            style={{
                                borderRadius: 15,
                                height: 140,
                                width: 140,
                            }}
                            onPress={() => {
                                Actions.imageZoomModel({
                                    images: [{ banner_url: this.state.objEventDetail.preview_url ?? this.state.objEventDetail.url }],
                                    index: 0,
                                });
                            }}
                        >
                            <ProgressiveImage
                                source={{ uri: this.state.objEventDetail.preview_url ?? this.state.objEventDetail.url }}
                                style={{
                                    borderRadius: 15,
                                    height: 140,
                                    width: 140
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                        </TouchableOpacity>
                        {// if event is free then when user clicked first time he will join event automatically and all the thing can be accessible
                            this.state.objEventDetail.hostProfessionalUser == false ?
                                this.state.objEventDetail.host_id != data.id &&
                                this.state.objEventDetail.collaborator == false &&
                                (this.state.objEventDetail.price_type == PriceType.chargeable &&
                                    this.props.attendingCnt <= this.props.numberSeat) &&
                                this.props.isPastEvent == false &&
                                (this.state.objEventDetail.is_ticket_request_pending ==
                                    undefined ||
                                    this.state.objEventDetail.is_ticket_request_pending ==
                                    "Rejected") &&
                                <Button
                                    mode="contained"
                                    style={{
                                        marginTop: 15
                                    }}
                                    uppercase={false}
                                    contentStyle={styles.button1}
                                    labelStyle={styles.buttonText1}
                                    onPress={() => {
                                        const {
                                            userData: { profileData },
                                        } = this.props;


                                        if (
                                            profileData.mobile_number != undefined &&
                                            profileData.mobile_number != ""
                                        ) {
                                            this.props.onJoinClicked(1)
                                        } else {
                                            this.props.onJoinClicked(0)
                                        }

                                    }}
                                    theme={{
                                        mode: 'exact',
                                        colors: {
                                            primary: 'white',
                                        },
                                    }}>
                                    {translate('bookNow')}
                                </Button> :
                                this.state.objEventDetail.subSlotStatus == true &&
                                this.state.objEventDetail.host_id != data.id &&
                                this.state.objEventDetail.collaborator == false &&
                                // (this.state.objEventDetail.price_type != undefined && 
                                //     this.state.objEventDetail.price_type == PriceType.chargeable &&
                                //     this.props.attendingCnt <= this.props.numberSeat) &&
                                this.props.isPastEvent == false &&
                                <Button
                                    mode="contained"
                                    style={{
                                        marginTop: 15,

                                    }}
                                    icon={require('../images/smallCalendar.png')}
                                    uppercase={false}
                                    contentStyle={styles.button1}
                                    labelStyle={styles.buttonText1}
                                    onPress={() => {
                                        this.props.onJoinClicked(0)
                                    }}
                                    theme={{
                                        mode: 'exact',
                                        colors: {
                                            primary: 'white',
                                        },
                                    }}>
                                    {translate('guestListBooking').toLowerCase()}
                                </Button>
                        }
                        {this.state.objEventDetail.is_ticket_request_pending !=
                            undefined &&
                            this.state.objEventDetail.is_ticket_request_pending ==
                            "Pending" && this.state.objEventDetail.hostProfessionalUser == false && (
                                <Button
                                    mode="contained"
                                    style={{
                                        marginTop: 15
                                    }}
                                    uppercase={false}
                                    disabled={true}
                                    contentStyle={styles.button1}
                                    labelStyle={styles.buttonText1}
                                    onPress={() => {
                                    }}
                                    theme={{
                                        mode: 'exact',
                                        colors: {
                                            primary: 'white',
                                        },
                                    }}>
                                    {translate('waiting')}
                                </Button>
                            )}
                    </View>
                </View>

                {/* {// if event is free then when user clicked first time he will join event automatically and all the thing can be accessible
                    this.state.objEventDetail.host_id != data.id &&
                    this.state.objEventDetail.collaborator == false &&
                    (this.state.objEventDetail.price_type == PriceType.chargeable &&
                        this.props.attendingCnt <= this.props.numberSeat) &&
                    this.props.isEventJoin == false &&
                    this.props.isPastEvent == false &&
                    (this.state.objEventDetail.is_ticket_request_pending ==
                        undefined ||
                        this.state.objEventDetail.is_ticket_request_pending ==
                        "Rejected") && (
                        <View
                            style={{
                                marginVertical: 15,
                                marginLeft: 15,
                                marginRight: 15,
                            }}
                        >
                            <CustomButtonFlat
                                text={this.getGoingAmnt()}
                                onPress={() => {
                                    const {
                                        userData: { profileData },
                                    } = this.props;

                                    if (
                                        this.state.objEventDetail.price_type != PriceType.free
                                    ) {
                                        if (
                                            profileData.mobile_number != undefined &&
                                            profileData.mobile_number != ""
                                        ) {
                                            Actions.selectTicket({
                                                event: this.state.objEventDetail,
                                            });
                                        } else {
                                            this.props.onJoinClicked(0)
                                        }
                                    } else {
                                        this.props.onJoinClicked(1)
                                    }
                                }}
                            />
                        </View>
                    )}*/}

                <Divider style={{ height: 1, marginVertical: 15 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button1: {
        alignContent: "center",
        backgroundColor: PINK_RED,
        borderRadius: 8,
        flexDirection: 'row-reverse'
    },
    buttonText1: {
        color: WHITE,
        fontFamily: SEMI_BOLD,
        fontSize: normalize(15),
        letterSpacing: 0,
        textTransform: 'capitalize'
        // marginHorizontal: 0,
        // paddingHorizontal: 0,
    },
})
const mapStateToProps = (state) => ({
    authData: state.authReducer.authData,
    userData: state.profileReducer.profileUser,
});


export default connect(
    mapStateToProps,
    null
)(SimplePartyDetailTopHeader);
