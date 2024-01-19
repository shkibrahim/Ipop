import { th } from 'date-fns/locale';
import React, { Component } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IconButton } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { callApi } from '../actions/auth.action';
import { WHITE } from '../helper/Color';
import { showToastMessage } from '../helper/Helper';
import { translate } from '../helper/Language';
import { RESULT_OK } from '../service/api';
import { POST_METHOD, REMOVEGELLARYMEDIA } from '../service/apiHelper';

class ImageZoom extends Component {

  constructor(props) {
    super(props);
    var arrayImage = props.images.map((item) => {
      return { url: item.image_url ?? item.banner_url}
    })
    this.state = {
      arrImage: arrayImage,
      arrActualImage: props.images,
      removeGallery: [],
      index: props.index
    };
  }

  async removeGalleryData(index, objData) {
    const { authData: { data } } = this.props

    const values = {
      'id': objData.id
    }
    try {

      const response = await this.props.dispatch(callApi(values, REMOVEGELLARYMEDIA, data.token, POST_METHOD));

      if (response.status === RESULT_OK) {

        let arrImages = this.state.arrImage ?? []
        arrImages.splice(index, 1);

        let arrData = this.state.arrActualImage
        arrData.splice(index, 1);

        EventRegister.emit('removeImageGallery', objData.id)

        this.setState({
          arrActualImage: arrData,
          arrImage: arrImages,
          index: 0
        }, () => {
          if (arrImages.length <= 0) {
            Actions.pop()
          }
        })

      }
      else {
        throw response
      }
    } catch (error) {
      if (error.code != 204)
        showToastMessage(error.message);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: WHITE, }}>

        <ImageViewer
          ref={ref => {
            this.imageRef = ref
          }}
          imageUrls={this.state.arrImage}
          index={this.state.index}
          enableSwipeDown={true}
          saveToLocalByLongPress={false}
          renderIndicator={() => <></>}
          onSwipeDown={() => {
            Actions.pop()
          }}
        />
        {this.renderHeader()}
      </View>
    );
  }

  renderHeader() {
    return <View style={{ position: 'absolute', width: '100%' }}>
      <SafeAreaView />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton
          icon={'close'}
          size={30}
          color={WHITE}
          onPress={() => {
            Actions.pop();
          }} />
        {
          this.props.isMyProfile && <IconButton
            icon={require('../images/remove.png')}
            color={WHITE}
            size={26}
            theme={{
              dark: true,
              mode: 'exact',
            }}
            onPress={() => {
              Alert.alert(
                translate("remove_image"),
                translate("remove_image_desc"),
                [
                  {
                    text: translate('Yes'),
                    onPress: () => {
                      // showToastMessage('Under developement')
                      this.removeGalleryData(this.imageRef.state.currentShowIndex, this.state.arrActualImage[this.imageRef.state.currentShowIndex])
                    }
                  },
                  {
                    text: translate("No"),
                    style: 'cancel'
                  },
                ],
                { cancelable: true }
              );
            }} />
        }
      </View>
    </View>
  }
}

mapStateToProps = (state) => ({
  authData: state.authReducer.authData
})


export default connect(mapStateToProps, null)(ImageZoom);