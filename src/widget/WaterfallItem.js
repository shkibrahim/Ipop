import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import styles from './styles';
import ImgAdapter from './ImgAdapter.js';

export default class WaterfallItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    // getHeight() {
    //     return this.props.width / this.props.source.ratio;
    // }
    getImageShown(source, width, onPress, index) {
        return <ImgAdapter text={source.text} source={source.img} ratio={source.ratio} width={width} height={this.props.source.height} obj={source} onPress={onPress} />;
    }
    render() {
        return (
            <View style={styles.DuelListItemContent}>
                {this.getImageShown(this.props.source, this.props.width, this.props.onPress, this.props.index)}
            </View>
        );
    }
};