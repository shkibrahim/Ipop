import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import { Actions } from 'react-native-router-flux';
import ProgressiveImage from './LoadImage';
import FastImage from 'react-native-fast-image';
import { WHITE } from '../helper/Color';

class MediaHeader extends Component {

  render() {
    return (
      <Appbar.Header style={styles.bottom}>
        {/* <SafeAreaView style={styles.bottom}/> */}
        <Appbar.Action
          icon={'close'}
          onPress={() => {
            this.props.onBackPress()
          }}
          color={WHITE}
        />

        {/* <Avatar.Image
                    size={36}
                    source={{ uri: this.props.profile }}
                    theme={{
                        dark: true
                    }} /> */}
        <TouchableOpacity
          onPress={() => {
            if (this.props.isMyProfile) {
              Actions.myProfile()
            } else {
              this.redirectOtherUser();

              // Actions.otherUserProfile({
              //   userId: this.props.obj.user_id,
              // });
            }

          }}>
          <ProgressiveImage
            style={{ width: 36, height: 36, borderRadius: 36 / 2.5 }}
            source={{ uri: this.props.obj.preview_sender_profile_picture ?? this.props.obj.sender_profile_picture }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>

        <Appbar.Content
          onPress={() => {
            if (this.props.isMyProfile) {
              Actions.myProfile()
            } else {
              this.redirectOtherUser();

              // Actions.otherUserProfile({
              //   userId: this.props.obj.user_id,
              // });
            }
          }}
          title={this.props.obj.sender_name}
          titleStyle={{ fontFamily: SEMI_BOLD, fontSize: normalize(14), color: WHITE }}
        />

        {/* <Appbar.Action
          icon={require('../images/BoardMedia/send.png')}
          color={WHITE}
          onPress={() => {this.props.shareLink()}}
        /> */}
        {
          (this.props.obj.id != undefined || this.props.mediaId != undefined) && <Appbar.Action
          icon={'dots-vertical'}
          color={WHITE}
          onPress={() => { this.props.rightButtonPress() }}
        />
        }
        


      </Appbar.Header>
    );
  }

  redirectOtherUser() {
    let values = {
      profile_picture: this.props.obj.sender_profile_picture,
      favourited_by: this.props.stateObj.upCnt,
      is_favourited: this.props.stateObj.is_Favourited,
      is_secret_liked: this.props.stateObj.isSecrateLike,
      id: this.props.obj.user_id,
      user_name: this.props.obj.sender_name,
      friends: this.props.obj.sender_friends ?? 0,
      events_joined: this.props.obj.sender_events_planned ?? 0,
      events_planned: this.props.obj.sender_events_joined ?? 0,
      status: this.props.obj.sender_about,
      is_driving: this.props.obj.sender_is_driving,
    };
    Actions.profileInfoModal({
      objProfile: values,
      eventId: this.props.obj.event_id,
    });
  }
}


const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'transparent',
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    elevation: 0,
  },
});

export default MediaHeader;
