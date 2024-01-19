import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import { Actions } from 'react-native-router-flux';


class EventSidebarHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

            <Appbar style={styles.bottom}>
                <SafeAreaView />
                <Appbar.BackAction onPress={() => {
                    Actions.pop()
                }} />

                <Avatar.Image size={36} source={require('../images/person_small.png')} />

                <Appbar.Content title="jona_therton" titleStyle={{ fontFamily: SEMI_BOLD, fontSize: normalize(14) }} />

                <Appbar.Action icon="dots-vertical" onPress={() => { }} />

            </Appbar>
        );
    }
}

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: 'white'

    },
});

export default EventSidebarHeader;
