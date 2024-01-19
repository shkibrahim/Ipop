import React, { Component } from 'react';
import {
  View,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { callApi } from '../actions/auth.action';
import { PALE_GREY2, PINK_RED } from '../helper/Color';
import GlobleStyles from '../helper/GlobleStyles';
import { showToastMessage, TagOperation } from '../helper/Helper';
import { RESULT_OK } from '../service/api';
import { GETBOARDMEDIA, POST_METHOD } from '../service/apiHelper';
import WaterfallView from '../widget/WaterfallView';
import rnTextSize from 'react-native-text-size';
import { MEDIUM } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import { Actions } from 'react-native-router-flux';
import { EventRegister } from 'react-native-event-listeners';
import { translate } from '../helper/Language';
import EmptyContent from '../components/EmptyContent';

const fontSpecs = {
  fontFamily: MEDIUM,
  fontSize: normalize(14),
};

/** we put 10 left 10 right space between cells */
const win = (Dimensions.get('window').width - 40.0) / 2.0;

class UserMemories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefresh: false,
      isLoadMore: false,
      currentPage: 0,
      totalCount: 0,
      currentCount: 0,
      arrMedia: [],
      friendshipStatus: props.friendshipStatus,
      showLoadmore: false
    };

  }

  isPrivateUser = () => {
    const value = this.props.privateUser ? this.props.privateUser : false
    return value
  }

  isProfileVisible = () => {
    const {
      authData: { data },
    } = this.props;

    const value = ((this.props.friendshipStatus === 'Accepted' || data.id == this.props.userId) || !(this.isPrivateUser()))
    return value
  }

  async componentDidMount() {
    const {
      authData: { data },
    } = this.props;

    if (this.isProfileVisible()) {
      this.getAllMedia(TagOperation.NormalCalling);
    }

    this.listener = EventRegister.addEventListener('addNewMedia', data => {
      this.getNewElementHeight(data);
    });
    this.listener1 = EventRegister.addEventListener('removeMedia', objData => {
      let index = this.state.arrMedia.findIndex(data => {
        return data.id === objData;
      });
      if (index !== -1) {
        let arrMedia = this.state.arrMedia;
        arrMedia.splice(index, 1);
        this.setState({
          arrMedia: arrMedia,
        });
      }
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    EventRegister.removeEventListener(this.listener1);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps && nextProps.updatedData != undefined) {
      let obj = nextProps.updatedData;

      let index = this.state.arrMedia.findIndex(data => {
        return data.id === obj.id;
      });
      if (index != -1) {
        let arrData = this.state.arrMedia;
        let objData = arrData[index];
        objData.like_count = obj.likedCnt;
        objData.is_liked = obj.isLiked;
        objData.comment_count = obj.commentedCnt;
        arrData[index] = objData;
        this.setState({
          arrMedia: arrData,
        });
      }
      return false;
    } else if (
      this.props != nextProps &&
      nextProps.friendshipStatus != this.props.friendshipStatus
    ) {
      const {
        authData: { data },
      } = this.props;
      this.setState(
        {
          friendshipStatus: nextProps.friendshipStatus,
        },
        () => {
          if (
            nextProps.friendshipStatus == 'Accepted' ||
            data.id == this.props.userId
          ) {
            this.getAllMedia(TagOperation.PullToRefresh);
          } else {
            this.setState({
              arrMedia: [],
              currentPage: 0,
              totalCount: 0,
            });
          }
        },
      );
    }
    return true;
  }

  async getAllMedia(operation) {
    try {
      const {
        authData: { data },
      } = this.props;
      const values = {
        user_id: this.props.userId,
        record_count:
          operation == TagOperation.NormalCalling
            ? 0
            : operation == TagOperation.PullToRefresh
              ? 0
              : this.state.currentPage + 1,
      };
      const response = await this.props.dispatch(
        callApi(values, GETBOARDMEDIA, data.token, POST_METHOD, true),
      );

      if (response.status === RESULT_OK) {
        if (operation == TagOperation.PullToRefresh) {
          if (response.data != undefined) {
            var arrData = await this.getElementHeight(response.data);
            this.setState({
              isRefresh: false,
              arrMedia: arrData,
              currentPage: 0,
              totalCount: response.total_records,
              currentCount: response.data.length,
            });
          } else {
            this.setState({
              isRefresh: false,
              arrMedia: [],
              currentPage: 0,
              totalCount: response.total_records,
              currentCount: 0,
            });
          }
        } else if (operation == TagOperation.LoadMore) {
          if (response.data != undefined) {
            var arrData = await this.getElementHeight(response.data);
            let count = this.state.arrMedia.length + response.data.length;
            let arrMedia = [...this.state.arrMedia, ...arrData];
            this.setState({
              isLoadMore: false,
              arrMedia: arrMedia,
              currentPage: this.state.currentPage + 1,
              totalCount: response.total_records,
              currentCount: count,
            });
          }
        } else {
          if (response.data != undefined) {
            var arrData = await this.getElementHeight(response.data);

            let loadmore = false;

            if (response.total_records - response.data.length > 0) {
              loadmore = true
            }
            this.setState({
              arrMedia: arrData,
              currentCount: response.data.length,
              totalCount: response.total_records,
              showLoadmore: loadmore
            });
          }
        }
      } else {
        if (operation == TagOperation.PullToRefresh) {
          this.setState({ isRefresh: false });
        } else if (operation == TagOperation.LoadMore) {
          this.setState({ isLoadMore: false });
        }
        throw response;
      }
    } catch (error) {
      console.log('Error in api: ', error);
      if (operation == TagOperation.PullToRefresh) {
        this.setState({ isRefresh: false });
      } else if (operation == TagOperation.LoadMore) {
        this.setState({ isLoadMore: false });
      }
      if (error.code != 204)
        showToastMessage(error.message);
    }
  }

  async getElementHeight(arrMedia) {
    var arrData = [];
    for (let i = 0; i < arrMedia.length; i++) {
      let element = arrMedia[i];
      if (element.image_url != undefined) {
        let imgWidth = element.width;
        let imgHeight = element.height;
        let ratio = win / imgWidth;
        let height = imgHeight * ratio;
        let obj = element;
        obj.height = height;
        obj.width = win;
        obj.img = element.preview_url ?? element.image_url;
        arrData.push(obj);
      } else if (element.video_url != undefined) {
        let obj = element;
        obj.height = win;
        obj.width = win;
        obj.img = element.video_url;
        arrData.push(obj);
      } else {
        let obj = element;
        arrData.push(obj);
      }
    }

    let filterData = arrMedia.filter(element => {
      return element.text != undefined;
    });
    const heights = await rnTextSize.flatHeights({
      text: filterData.map(element => element.text),
      width: win - 10, // max-width of the "virtual" container
      ...fontSpecs,
    });
    filterData.forEach((element, index) => {
      let objHeight = heights[index];
      let objindex = arrData.findIndex(obj => element.id == obj.id);
      let obj = arrData[objindex];
      obj.height = objHeight + 19.0 + 35.0 + 12.0;
      obj.width = win - 10;
      obj.text = element.text;
      arrData[objindex] = obj;
    });
    return arrData;
  }

  async getNewElementHeight(ObjNewData) {
    if (ObjNewData.image_url != undefined) {
      let element = ObjNewData;

      let imgWidth = element.width;
      let imgHeight = element.height;
      let ratio = win / imgWidth;
      let height = imgHeight * ratio;
      element.height = height;
      element.width = win;
      element.img = element.preview_url ?? element.image_url;
      let arrMedia = this.state.arrMedia;
      arrMedia.splice(0, 0, element);

      this.setState({
        arrMedia: arrMedia,
      });
    } else if (ObjNewData.video_url != undefined) {
      let element = ObjNewData;

      element.height = win;
      element.width = win;
      element.img = element.video_url;
      let arrMedia = this.state.arrMedia;
      arrMedia.splice(0, 0, element);

      this.setState({
        arrMedia: arrMedia,
      });
    } else {
      const heights = await rnTextSize.measure({
        text: ObjNewData.text,
        width: win - 10, // max-width of the "virtual" container
        usePreciseWidth: true,
        ...fontSpecs,
      });
      let element = ObjNewData;
      element.height = heights.height + 19.0 + 40.0 + 12.0;
      element.width = win - 10;
      let arrMedia = this.state.arrMedia;
      arrMedia.splice(0, 0, element);

      this.setState({
        arrMedia: arrMedia,
      });
    }
  }

  onRefresh() {
    this.setState({
      isRefresh: true,
    });
    this.getAllMedia(TagOperation.PullToRefresh);
  }

  // MARK:- HANDLE LOAD MORE
  handleLoadMore() {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    console.log('Load more now');
    if (
      this.state.isLoadMore ||
      this.state.isRefresh ||
      this.state.currentCount >= this.state.totalCount
    ) {
      this.setState({ showLoadmore: false })
      return null;
    }
    this.setState({
      isLoadMore: true,
    });
    console.log('Load more called');
    this.getAllMedia(TagOperation.LoadMore);
  }
  // MARK:- LODE MORE METHODS
  renderFooter() {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null

    if (
      this.state.isRefresh == false &&
      this.state.currentCount < this.state.totalCount
    ) {
      return (
        <View style={GlobleStyles.refreshView}>
          <ActivityIndicator />
        </View>
      );
    }
    return <View />;
  }


  render() {
    const {
      authData: { data },
    } = this.props;

    return (
      <View style={styles.container}>
        {
          this.isProfileVisible() && this.state.arrMedia.length > 0
          && <WaterfallView
            displayItemList={this.state.arrMedia}
            number="2"
            onPress={obj => {
              Actions.refresh({
                showMedia: obj,
              });
            }}
            handleLoadMore={() => {
              console.log("Load More Called");
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefresh}
                onRefresh={() => {
                  this.onRefresh();
                }}
              />
            }
          // onEndReachedThreshold={16}
          // onEndReached={this.handleLoadMore.bind(this)}
          />
        }

        {
          this.isProfileVisible() && this.state.showLoadmore && <TouchableOpacity onPress={() => {
            this.handleLoadMore()
          }}>
            <Text style={styles.title}>{translate('older_data')}</Text>
          </TouchableOpacity>
        }
        {
          !(this.isProfileVisible()) &&
          <EmptyContent
            style={{ height: '50%' }}
            img={require('../images/ic_account_lock.png')}
            title={translate('no_account_detail_title')}
            message={translate('no_account_detail_msg').replace('{user_name}', this.props.userName)}
          />
        }
        {
          (data.id == this.props.userId && this.state.arrMedia.length == 0) &&
          <EmptyContent
            style={{ height: '50%' }}
            img={require('../images/ic_hurry_up.png')}
            title={translate('create_your_first_post')}
          />
        }
        <SafeAreaView />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALE_GREY2,
  },
  flatList: {
    marginTop: 16,
    marginLeft: 6,
    marginRight: 6,
  },
  title: {
    fontFamily: MEDIUM,
    fontSize: normalize(18),
    color: PINK_RED,
    textAlign: 'center',
    marginStart: 5,
    marginVertical: 15,
  },
});

const mapStateToProps = state => ({
  authData: state.authReducer.authData,
});

export default connect(
  mapStateToProps,
  null,
)(UserMemories);
