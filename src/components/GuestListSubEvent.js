import React, { Component } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { callApi } from '../actions/auth.action';
import Loader from '../components/Loader';
import { WHITE } from '../helper/Color';
import { showToastMessage } from '../helper/Helper';
import { GuestListType } from '../screens/GuestList';
import { RESULT_OK } from '../service/api';
import { GETALLSUBEVENT, GET_METHOD } from '../service/apiHelper';
import SubEventRow from "../flatlistrow/SubEventRow";

class GuestListSubEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSubEvent: []
    };
    this.fetchAllSubEvent()
  }


  async fetchAllSubEvent() {
    try {
      const {
        authData: { data },
      } = this.props;



      let apiPoint = GETALLSUBEVENT + "/" + this.props.event.id

      const response = await this.props.dispatch(
        callApi(undefined, apiPoint, data.token, GET_METHOD)
      );

      if (response.status === RESULT_OK) {
        this.setState({
          arrSubEvent: response.data
        });

      } else {
        throw response;
      }
    } catch (error) {
      console.log("Error in api: ", error);
      if (error.code != 204) showToastMessage(error.message);
    }
  }

  render() {
    const {
      authData: { data },
    } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: WHITE }}>
        <Loader />
        <FlatList
          data={this.state.arrSubEvent}
          renderItem={({ item, index }) => {
            item.event_type = this.props.event.event_type
            item.location = this.props.event.location
            item.host_id = this.props.event.host_id
            item.url = item.images[0]?.preview_url ?? item.images[0]?.image_url 
            return <SubEventRow
              key={index}
              event={item}
              isFromCreateEvent={false}
              isFromGuestList={true}
              onPress={() => {
                Actions.guestList({
                  event: this.props.event,
                  guestListType: GuestListType.subEventGuestList,
                  subEvent: item
                })
              }}
            />
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.subEventId.toString()}
          style={{
            marginTop: 16
          }}
        />
        <SafeAreaView />
      </View>
    );
  }
}



const mapStateToProps = (state) => ({
  authData: state.authReducer.authData,
});


export default connect(
  mapStateToProps,
  null
)(GuestListSubEvent);