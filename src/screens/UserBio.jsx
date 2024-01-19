import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {BLACK, GREYISH_BROWN, PALE_GREY2, WHITE} from '../helper/Color';
import {MEDIUM, REGULAR, SEMI_BOLD} from '../helper/FontName';
import {normalize} from '../helper/FontSIze';
import {translate} from '../helper/Language';

export default class UserBio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.viewContainer}>
          <ScrollView
            style={{marginTop: 25, marginLeft: 30, marginRight: 12}}
            showsVerticalScrollIndicator={false}>
            <Text style={style.lblTitle}>{translate('Name')}</Text>
            <Text style={[style.lblValue, {marginTop: 10}]}>
              {this.props.objProfile.first_name +
                ' ' +
                this.props.objProfile.last_name}
            </Text>
            <Text style={[style.lblTitle, {marginTop: 30}]}>
              {translate('About')}
            </Text>
            <Text style={[style.lblValue, {marginTop: 10}]}>
              {this.props.objProfile.about == undefined
                ? '-'
                : this.props.objProfile.about}
            </Text>
            <Text style={[style.lblTitle, {marginTop: 30}]}>
              {translate('Email')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image source={require('../images/email.png')} />
              <Text style={[style.lblValue, {marginLeft: 10}]}>
                {this.props.objProfile.email}
              </Text>
            </View>
            <Text style={[style.lblTitle, {marginTop: 30}]}>
              {translate('Phone')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
              }}>
              <Image source={require('../images/phone.png')} />
              {this.props.objProfile.country_code != undefined ? (
                <Text style={[style.lblValue, {marginLeft: 10}]}>
                  +{this.props.objProfile.country_code}{' '}
                  {this.props.objProfile.mobile_number}
                </Text>
              ) : (
                <Text style={[style.lblValue, {marginLeft: 10}]}>-</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALE_GREY2,
  },
  viewContainer: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: WHITE,
    height: '90%',
    width: '92%',
    borderRadius: 20,
  },
  lblTitle: {
    fontFamily: SEMI_BOLD,
    fontSize: normalize(14),
    color: BLACK,
  },
  lblValue: {
    fontFamily: MEDIUM,
    fontSize: normalize(14),
    color: GREYISH_BROWN,
  },
});
