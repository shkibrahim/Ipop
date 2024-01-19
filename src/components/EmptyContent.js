import React, { Component } from "react";
import { Image, View, Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import { NO_CONTENT_TEXT } from "../helper/Color";
import { normalize } from "../helper/FontSIze";
import { REGULAR, SEMI_BOLD } from "../helper/FontName";

class EmptyContent extends Component {
  static propTypes = {
    img: Image.propTypes.source,
    title: PropTypes.string,
    message: PropTypes.string,
  };

  static defaultProps = {
    title: "",
    message: ""
  };

  render() {
    const { img, title, message } = this.props;
    const { container, imageContainer, titleStyle, messageStyle } = styles;
    return (
      <View style={[container, this.props.style]}>
        <Image style={imageContainer} source={img} resizeMode={FastImage.resizeMode.cover} />
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'yellow'
  },
  imageContainer: {
    overflow: "hidden",
    height: normalize(200),
    width: normalize(200),
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
  },
  titleStyle: {
    fontWeight: Platform.OS == 'android' ? null : "700",
    color: NO_CONTENT_TEXT,
    fontFamily: SEMI_BOLD,
    marginHorizontal: 24,
  },
  messageStyle: {
    fontWeight: Platform.OS == 'android' ? null : "200",
    marginVertical: normalize(16),
    marginHorizontal: normalize(24),
    textAlign: 'center',
    color: NO_CONTENT_TEXT,
    fontFamily: REGULAR,
  }
});

export default EmptyContent;