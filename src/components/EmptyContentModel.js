import React, { Component } from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet, Modal, Dimensions, Platform, Alert } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import ProgressiveImage from "./LoadImage";
import { NO_CONTENT_TEXT, WHITE } from "../helper/Color";
import { normalize } from "../helper/FontSIze";
import { REGULAR, SEMI_BOLD } from "../helper/FontName";

class EmptyContentModel extends Component {
  static propTypes = {
    img: Image.propTypes.source,
    title: PropTypes.string,
    message: PropTypes.string,
    visible: PropTypes.bool
  };

  static defaultProps = {
    title: "",
    message: "",
    visible: false
  };

  constructor(props) {
    super(props)
    this.state = {
      visible: props.visible
    };
  }

  render() {
    const { img, title, message } = this.props;
    const { container, imageContainer, titleStyle, messageStyle, closeImageStyle } = styles;
    return (
      <Modal
        transparent
        animationType="fade"
        visible={this.state.visible}
        onRequestClose={() => {
          this.props.onClose?this.props.onClose():null
        }}>
        <View style={container}>
          <View style={{
            width: '80%',
            backgroundColor: WHITE,
            borderRadius: normalize(24),
            paddingBottom: normalize(24),
          }}>
            <TouchableOpacity
              style={[closeImageStyle ]}
              onPress={() => {
                this.setState({
                  visible: false
                })
              }}>
              <Image
                source={require('../images/Cross_Pink.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
            <ProgressiveImage style={imageContainer} source={img} resizeMode={FastImage.resizeMode.cover} />
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              minimumFontScale={0.01}
              style={[{ fontSize: 18 }, titleStyle]}>
              {title}
            </Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={3}
              minimumFontScale={0.01}
              style={[{ fontSize: 13 }, messageStyle]}>
              {message}</Text>
          </View>

        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    overflow: "hidden",
    height: normalize(200),
    width: normalize(200),
    alignSelf:'center',
    marginTop:normalize(-24)
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined
  },
  titleStyle: {
    fontWeight: Platform.OS == 'android'?null:"700",
    color: NO_CONTENT_TEXT,
    alignSelf:'center',
    fontFamily: SEMI_BOLD,
  },
  messageStyle: {
    fontWeight: Platform.OS == 'android'?null:"200",
    color: NO_CONTENT_TEXT,
    alignSelf:'center',
    textAlign:'center',
    marginVertical:normalize(8),
    marginHorizontal:normalize(24),
    fontFamily: REGULAR,
  },
  closeImageStyle: { 
    width: normalize(16), 
    height: normalize(16), 
    margin: 16, 
    alignSelf: 'flex-end' 

  }
});

export default EmptyContentModel;