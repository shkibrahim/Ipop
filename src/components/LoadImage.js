import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import FastImage from "react-native-fast-image";
import { PINK_RED } from "../helper/Color";
import * as Progress from 'react-native-progress';


class ProgressiveImage extends Component {

    

    static defaultProps = {
        style: {},
        resizeMode: FastImage.resizeMode.cover,
        source: '',
        // key: "0"
    };

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            progress: 0.0,
            source : this.props.source
            // style: StyleSheet.flatten(props.style)
        }
    }

    shouldComponentUpdate(nextProps) {
        if (this.props != nextProps && this.props.source != nextProps.source) {
            this.setState({
                loading: false,
                progress: 0.0,
                source: nextProps.source
            })
        }
        return true
    }

    onLoadEnd() {
        this.setState({ loaded: true })
    }

    getUriImage(uri) {
        let orignalUrl = (uri !== null && uri !== undefined && uri.includes("/") && uri.includes(".") ? uri : "")
        return orignalUrl
    }

    render() {
        let source = this.state.source;

        return (
            <>
                {
                    source && source.uri && source.uri != "" ?
                        <FastImage
                            {...this.props}
                            // key={this.props.key ?? "0"}
                            source={{
                                uri: this.getUriImage(source.uri),
                                cache: FastImage.cacheControl.immutable,
                                priority: FastImage.priority.high
                            }}
                            onProgress={(event) => {
                                let percentage = (event.nativeEvent.loaded / event.nativeEvent.total)
                                this.setState({
                                    progress: percentage
                                })
                            }}
                            onLoadStart={() => { this.setState({ loading: true }) }}
                            onLoadEnd={() => { this.setState({ loading: false }) }}
                            onError={() => {
                                this.setState({
                                    source : { uri : "https://popup-thumbnails.s3.eu-central-1.amazonaws.com/popup/uploads/profile/default.png"}
                                })
                            }}
                        >
                            {
                                this.state.loading == true &&
                                <View
                                    style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}
                                >
                                    <View
                                        style={{ flexDirection: 'row' }}
                                    >
                                        {/* <Image {...this.props} resizeMode={} source={require('../images/default.png')}/> */}
                                        <Progress.Pie progress={this.state.progress} size={50} animated={true} borderColor={PINK_RED} color={PINK_RED} />

                                    </View>
                                </View>
                            }

                        </FastImage>
                        :
                        <Image style={this.props.style} />
                }
            </>
        )
    }
}
ProgressiveImage.propTypes =  {
    style: PropTypes.object,
    resizeMode: PropTypes.string,
    source: PropTypes.object
};
export default ProgressiveImage