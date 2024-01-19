import React, { Component } from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import ProgressiveImage from "./LoadImage";

class AvatarRedefined extends Component {
  static propTypes = {
    img: Image.propTypes.source,
    placeholder: PropTypes.string,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    roundedImage: PropTypes.bool,
    roundedPlaceholder: PropTypes.bool,
  };

  static defaultProps = {
    roundedImage: true,
    roundedPlaceholder: true,
  };

  renderImage = () => {
    const { img, width, height, roundedImage } = this.props;
    const { imageContainer, image } = styles;

    const viewStyle = [imageContainer];

    return (
      <View style={viewStyle}>
        <ProgressiveImage
          style={image}
          source={img}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  };

  renderPlaceholder = () => {
    const { placeholder, width, height, roundedPlaceholder } = this.props;
    const { placeholderContainer, placeholderText } = styles;

    const viewStyle = [placeholderContainer];
   
    return (
      <View style={viewStyle}>
        <View style={viewStyle}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            minimumFontScale={0.01}
            style={[{ fontSize: Math.round(45) / 2 }, placeholderText]}
          >
            {placeholder}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const { img, width, height } = this.props;
    const { container } = styles;
    return (
      <View style={[container, this.props.style, { width, height }]}>
        {img != undefined ? this.renderImage() : this.renderPlaceholder()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  imageContainer: {
   
    justifyContent: "center",
   
  },
  image: {
    height: 45,
    width: 45,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dddddd",
    height: 45,
    width: 45,
    borderRadius: 15,
  },
  placeholderText: {
    fontWeight: "700",
    color: "#ffffff",
  },
});

export default AvatarRedefined;
