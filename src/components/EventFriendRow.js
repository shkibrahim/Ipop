import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import moment from "moment";
import { getCategoryName, getImageEventCat, isDefaultDate } from '../helper/Helper';
import { WHITE } from '../helper/Color';
import ProgressiveImage from './LoadImage';
import FastImage from 'react-native-fast-image';
import I18n from 'i18n-js';

class EventFriendRow extends Component {

    getEventTime() {
        let eventStartDate = this.props.event.start_date
        let eventEndDate = this.props.event.end_date
        let momentStartDate = moment(eventStartDate, 'YYYY-MM-DDTHH:mm:ss')
        let momentEndDate = moment(eventEndDate, 'YYYY-MM-DDTHH:mm:ss')
        return momentStartDate.format('dddd DD MMM YYYY') + " ● " + momentStartDate.format('HH:mm') + " - " + momentEndDate.format('HH:mm')
    }

    render() {
        return (

            <TouchableOpacity style={this.props.isFromHome ? { marginVertical: 15, marginEnd: 10 } : { margin: 10 }} onPress={() => this.props.onPress()}>

                <ProgressiveImage
                    style={this.props.isFromHome ? { height: 160, width: 320, resizeMode: 'contain', borderRadius: 16 } : { height: 160, width: '100%',resizeMode: 'contain', borderRadius: 16 }}
                    source={{ uri: this.props.event.preview_url ?? this.props.event.url }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <Image
                    style={ this.props.isFromHome ? { height: 160, width: 320, resizeMode: 'contain', position: 'absolute' } : { height: 160, width: '100%', resizeMode: 'stretch', position: 'absolute' }}
                    source={require('../images/shadow.png')}
                />

                <View style={styles.absolute}>

                    <View style={{ justifyContent: 'space-between', flex: 1, }}>

                        <View>

                            <Text style={styles.title}>{this.props.event.title}</Text>
                            
                            {
                                isDefaultDate(this.props.event.end_date) == false && <View style={styles.rowView}>

                                <Image
                                    style={styles.smallImage}
                                    source={require('../images/calender_small.png')}
                                />

                                <Text style={styles.smallText}>{this.getEventTime()}</Text>

                            </View>
                            }
                            

                            <View style={styles.rowView}>

                                <Image
                                    style={styles.smallImage}
                                    source={getImageEventCat(this.props.event.category)}
                                />

                                <Text style={styles.smallText}>{getCategoryName(this.props.event.category)}</Text>

                            </View>

                        </View>

                        <>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <ProgressiveImage
                                    style={styles.smallImagePerson}
                                    source={{ uri: this.props.event.attendee_profile_picture }}

                                />

                                <Text style={styles.smallText}>
                                    {this.props.event.attendee_username == undefined ? '' : this.props.event.attendee_username + (this.props.event.friend_going_count > 0 ? " + " + this.props.event.friend_going_count : '')}
                                </Text>

                            </View>

                        </>

                    </View>

                </View>

            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: SEMI_BOLD,
        fontSize: normalize(22),
        color: 'white'
    },
    smallImage: {
        height: 12,
        width: 12,
        resizeMode: 'contain',
        tintColor: WHITE
    },
    smallImagePerson: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
        borderRadius: 12
    },
    smallText: {
        fontFamily: SEMI_BOLD,
        fontSize: normalize(10),
        color: 'white',
        marginStart: 5
    },
    bullet:
    {
        height: 5,
        width: 5,
        borderRadius: 5 / 2,
        backgroundColor: 'white',
        marginStart: 10
    },
    absolute: {
        position: 'absolute',
        marginVertical: 10,
        marginLeft: 10,
        top: 0,
        bottom: 0
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    }
})

export default EventFriendRow;
