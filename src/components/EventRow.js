import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Card from './Card';
import GlobleStyles from '../helper/GlobleStyles';
import { DUSK, RGB_161_161_181, WHITE } from '../helper/Color';
import moment from 'moment';
import { getCategoryName, getImageEventCat, isDefaultDate } from '../helper/Helper';
import { MEDIUM } from '../helper/FontName';
import { connect } from 'react-redux';
import ProgressiveImage from './LoadImage';
import FastImage from 'react-native-fast-image';
import { translate } from '../helper/Language';
import I18n from 'i18n-js';

class EventRow extends Component {
  constructor(props) {
    super(props);
  }

  getEventTime() {
    if (this.props.event != undefined) {
      let eventStartDate = this.props.event.start_date;
      let eventEndDate = this.props.event.end_date;

      let momentStartDate = moment(eventStartDate, 'YYYY-MM-DDTHH:mm:ss');
      let momentEndDate = moment(eventEndDate, 'YYYY-MM-DDTHH:mm:ss');
      if (momentStartDate.isSameOrBefore(moment(), 'day') == true) {
        //Check date is belongs to today or not
        if (
          momentStartDate.isSame(momentEndDate, 'day') &&
          momentEndDate.isAfter(moment())
        ) {
          if (momentStartDate.isBefore(moment())) {
            // Event already started
            return translate('Now_Until') + " " + momentEndDate.local(I18n.currentLocale()).format('HH:mm');
          } else {
            return translate('Until') + " " + momentEndDate.local(I18n.currentLocale()).format('HH:mm');
          }
        } else if (
          momentStartDate.isBefore(moment()) &&
          momentEndDate.isAfter(moment())
        ) {
          if (momentStartDate.isBefore(moment())) {
            // Event already started and end at diffrent day
            return translate('Now_Until') + " " + momentEndDate.local(I18n.currentLocale()).format('DD-MMM-YYYY HH:mm');
          } else {
            return translate('Until') + " " + momentEndDate.local(I18n.currentLocale()).format('DD-MMM-YYYY HH:mm');
          }
        } else {
          return (
            momentStartDate.local(I18n.currentLocale()).format('DD-MMM-YYYY HH:mm') +
            ' - ' +
            momentEndDate.local(I18n.currentLocale()).format('DD-MMM-YYYY HH:mm')
          );
        }
      } else {
        if (momentStartDate.isSame(momentEndDate, 'day') == true) {
          return (
            momentStartDate.local(I18n.currentLocale()).format('DD-MMM-YYYY HH:mm') +
            ' - ' +
            momentEndDate.local(I18n.currentLocale()).format('HH:mm')
          );
        } else {
          return (
            momentStartDate.local(I18n.currentLocale()).format('DD-MMM-YYYY HH:mm') +
            ' - ' +
            momentEndDate.local(I18n.currentLocale()).format('DD-MMM-YYYY HH:mm')
          );
        }
      }
    } else {
      return this.props.time;
    }
  }
  render() {
    let eventCatImage = getImageEventCat(this.props.event.category);

    const {
      authData: { data },
    } = this.props;

    return (
      <Card style={{ marginBottom: 15, marginHorizontal: 5 }}>
        <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.7}>
          <View style={{ flexDirection: 'row', margin: 15, alignItems: 'center' }}>
            <ProgressiveImage
              style={{
                height: 96,
                width: 96,
                resizeMode: 'cover',
                borderRadius: 10,
              }}
              source={{ uri: this.props.event.preview_url ?? this.props.event.url }}
              resizeMode={FastImage.resizeMode.cover}
            />

            <View style={{ marginStart: 10, flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: 13,
                  alignItems: 'center',
                }}>
                {this.props.event && this.props.event.host_id === data.id && (
                  <ImageBackground
                    source={require('../images/host.png')}
                    style={{ width: 50, height: 25 }}>
                    <Text
                      style={{
                        fontFamily: MEDIUM,
                        fontSize: 12,
                        color: WHITE,
                        marginLeft: 8,
                        marginTop: 3,
                      }}>
                      {translate('Host')}
                    </Text>
                  </ImageBackground>
                )}
                {
                  isDefaultDate(this.props.event.end_date) == false &&
                  <Text
                    style={[
                      GlobleStyles.font10RegularPinkRed,
                      { flex: 1, marginLeft: this.props.event && this.props.event.host_id === data.id ? 8 : 0 },
                    ]}>{this.getEventTime()}</Text>
                }

              </View>

              {/* <Text style={GlobleStyles.font10RegularPinkRed}>{this.getEventTime()}</Text> */}

              <Text
                numberOfLines={1}
                style={[GlobleStyles.font17MediumDusk, { marginTop: 5 }]}>
                {this.props.event.title}
              </Text>

              <Text
                style={[
                  GlobleStyles.font12RegularGrey,
                  { marginTop: 5, color: DUSK },
                ]}>
                {this.props.event.location}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Image
                  style={{ height: 13, width: 13, resizeMode: 'contain' }}
                  source={eventCatImage}
                />

                <Text
                  style={[
                    GlobleStyles.font12RegularGrey,
                    { color: RGB_161_161_181, marginStart: 5 },
                  ]}>
                  {getCategoryName(this.props.event.category)}
                </Text>

                {/* <Image
                                    style={{ height: 10, width: 10, resizeMode: 'contain', marginStart: 10 }}
                                    source={require('../images/rs.png')}
                                /> */}

                {/* <Text style={[GlobleStyles.font12RegularGrey, { color: PINK_RED, marginStart: 5 }]}>{this.props.price}</Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}

mapStateToProps = state => ({
  authData: state.authReducer.authData,
});

export default connect(
  mapStateToProps,
  null,
)(EventRow);
