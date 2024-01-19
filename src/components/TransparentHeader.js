import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableWithoutFeedback, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

class TransparentHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.backgroundStyle}>

                <StatusBar />

                <View style={{ flexDirection: 'row' }}>

                </View>


            </View>
        );
    }
}

export default TransparentHeader;
