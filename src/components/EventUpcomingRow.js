import React, { Component } from 'react';
import moment from 'moment';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, } from 'react-native';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import { getImageEventCat } from '../helper/Helper';
import ProgressiveImage from './LoadImage';
import FastImage from 'react-native-fast-image';

class EventUpcomingRow extends Component {

    render() {

        return (

            <View style={{ marginVertical: 15, }}>
                <TouchableOpacity onPress={this.props.onPress}>
                    <ProgressiveImage
                        style={{ height: 180, width: '100%', resizeMode: 'contain', borderRadius: 10, }}
                        source={{ uri: this.props.event.preview_url ?? this.props.event.url }}
                        resizeMode={FastImage.resizeMode.cover}
                    />

                    <Image
                        style={{ height: 180, width: '100%', resizeMode: 'cover', position: 'absolute', borderRadius: 10, }}
                        source={require('../images/shadow.png')}
                    />
                    {
                        this.props.event.start_date != undefined && <View style={{ position: 'absolute', alignSelf: 'flex-end', borderRadius: 15, }}>

                            <ImageBackground style={{ width: 120, padding: 8, margin: 10, alignItems: 'center' }}
                                imageStyle={{ resizeMode: 'cover', borderRadius: 5 }}
                                source={require('../images/date_shadow.png')}>

                                <Text style={styles.smallText}>{moment(this.props.event.start_date, 'YYYY-MM-DDTHH:mm:ss').format('ll')}</Text>

                            </ImageBackground>


                        </View>
                    }




                    <View style={styles.absolute}>

                        <View style={{ justifyContent: 'flex-end', flex: 1 }}>

                            <View>

                                <Text style={styles.title}>{this.props.event.title}</Text>

                                <View style={{ marginTop: 5, flexDirection: 'row' }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        <Image
                                            style={styles.smallImage}
                                            source={getImageEventCat(this.props.event.category)}

                                        />

                                        <Text style={styles.smallText}>{this.props.event.category}</Text>

                                        {/*   <Image
                                        style={styles.smallImage}
                                        source={require('../images/rs_white.png')}

                                    />

                                    <Text style={styles.smallText}>€40 - €90</Text> */}

                                    </View>
                                </View>

                            </View>



                        </View>

                    </View>

                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: SEMI_BOLD,
        fontSize: normalize(18),
        color: 'white'
    },
    smallImage: {
        height: 12,
        width: 12,
        resizeMode: 'contain'
    },
    smallText: {
        fontFamily: SEMI_BOLD,
        fontSize: normalize(12),
        color: 'white',
        marginStart: 5,
        marginEnd: 10
    },
    absolute: {
        position: 'absolute',
        marginVertical: 10,
        marginLeft: 10,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
})

export default EventUpcomingRow;
