import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Card from './Card';
import GlobleStyles from '../helper/GlobleStyles';
import { DUSK, RGB_161_161_181, PINK_RED } from '../helper/Color';

class LocationRow extends Component {

    render() {

        let image = ''

        switch (this.props.image) {
            case 'location1':
                image = require('../images/tempImages/location1.png')
                break;

            case 'location2':
                image = require('../images/tempImages/location2.png')
                break;

            default:
                break;
        }
        return (
            <Card style={{ marginTop: 15 , marginHorizontal: 5,}}>

                <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center' }}>

                    <Image
                        style={{ height: 96, width: 96, resizeMode: 'contain' }}
                        source={image}
                    />

                    <View style={{ marginStart: 10, flex: 1 }}>


                        <Text style={[GlobleStyles.font17MediumDusk, { marginTop: 5 }]}>{this.props.place}</Text>

                        <Text style={[GlobleStyles.font12RegularGrey, { marginTop: 5, color: DUSK }]}>{this.props.vanue}</Text>


                    </View>

                </View>

            </Card>
        );
    }
}

export default LocationRow;
