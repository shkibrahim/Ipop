import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import { Actions } from 'react-native-router-flux';
import ProgressiveImage from './LoadImage';
import FastImage from 'react-native-fast-image';
import { DUSK } from '../helper/Color';

class ChatHeader extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Appbar.Header style={styles.bottom}>
        {/* <SafeAreaView style={styles.bottom}/> */}
        <Appbar.Action
          icon={this.props.isFromMenuDetails != undefined ? 'close' : require('../images/ic_back.png')}
          color={DUSK}
          onPress={() => Actions.pop()}
        />

        {/* <Avatar.Image
                    size={36}
                    source={{ uri: this.props.profile }}
                    theme={{
                        dark: true
                    }} /> */}
        <TouchableOpacity
          onPress={() => {
            Actions.otherUserProfile({
              userId: this.props.id,
            });
          }}>
          <ProgressiveImage
            style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
            source={{ uri: this.props.profile ?? "" }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        <Appbar.Content
          onPress={() => {
            Actions.otherUserProfile({
              userId: this.props.id,
            });
          }}
          title={this.props.title}
          titleStyle={{ fontFamily: SEMI_BOLD, fontSize: normalize(14) }}
          subtitle={this.props.online ? "Online" : ""}
          subtitleStyle={{ fontFamily: SEMI_BOLD, fontSize: normalize(12) }}
        />

        {/* <Appbar.Action icon="dots-vertical" onPress={() => { }} /> */}
      </Appbar.Header>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'white',
    elevation: 0,
  },
});

export default ChatHeader;
