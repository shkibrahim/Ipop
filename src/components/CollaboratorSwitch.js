import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MEDIUM, SEMI_BOLD, BOLD } from '../helper/FontName';


const Switch = (props) => {
    return (
        <View style={{ width: wp('85%'), flexDirection: "row", justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: wp('4%'), fontFamily: SEMI_BOLD, color: 'white' }}>{props.title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ fontSize: wp('2%'), fontFamily: BOLD, color: 'white' }}>Off</Text>
                <TouchableOpacity onPress={props.onPress}>
                    <Image
                        source={props.state ? require('../images/toggle_on.png') : require('../images/toggle_off.png')}
                        resizeMode={'contain'}
                        style={{ width: wp('10%'), height: wp('10%'), marginHorizontal: wp('1%') }}
                    />
                </TouchableOpacity>
                <Text style={{ fontSize: wp('2%'), fontFamily: BOLD, color: 'white' }}>On</Text>
            </View>
        </View>
    );
};

export default Switch

