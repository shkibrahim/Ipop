import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import { Dimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { PINKISH_GREY, PINK_RED, WHITE } from '../helper/Color';
import { connect } from 'react-redux';
import { translate } from '../helper/Language';
import GuestListBooking from './GuestListBooking';
import GuestListSubEvent from './GuestListSubEvent';


const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: PINK_RED, height: 2 }}
        style={{ backgroundColor: WHITE }}
        renderLabel={({ route, focused }) => (
            <Text
                style={{
                    color: focused ? PINK_RED : PINKISH_GREY,
                    fontFamily: SEMI_BOLD,
                    fontSize: normalize(14),
                }}>
                {route.title}
            </Text>
        )}
    />
);
const initialLayout = { width: Dimensions.get('window').width };

class NewGuestListProfessionalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'event', title: translate('guestListEvent') },
                { key: 'booking', title: translate('guestListBooking') },
            ],
        };
    }
    componentDidMount() {
    }

    renderScreen = ({ route }) => {
        switch (route.key) {
            case 'event':
                return <GuestListSubEvent event={this.props.event} />
            default:
                return <GuestListBooking event={this.props.event} />
        }
    };
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: WHITE }}>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={this.state}
                    renderScene={this.renderScreen}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={initialLayout}
                    lazy
                />

                <SafeAreaView />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

mapStateToProps = state => ({
    authData: state.authReducer.authData,
});

export default connect(mapStateToProps)(NewGuestListProfessionalUser);