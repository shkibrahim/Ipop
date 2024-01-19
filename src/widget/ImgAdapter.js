import React, { Component } from 'react';
import {
    Image, View, Text
} from 'react-native';
import MemoriesWithPic from '../flatlistrow/MemoriesWithPic'
import MemoriesWithStatus from '../flatlistrow/MemoriesWithStatus'


class ImgAdapter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
        };
    }

    componentDidMount = () => {
        let width = this.props.width;
        //et height = width / this.props.ratio;
        let height = this.props.height
        this.setState({ width, height });
    };

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    render() {
        return (
            // <Image
            //     style={{
            //         width: this.state.width,
            //         height: this.state.height,
            //         backgroundColor: 'transparent',
            //         marginRight: 10,
            //     }}
            //     source={this.props.source} />

            <View>

                {this.props.text ? <MemoriesWithStatus
                    width={this.state.width}
                    height={this.state.height}
                    text={this.props.text}
                    obj={this.props.obj}
                    onPress={this.props.onPress}
                />
                    :

                    <MemoriesWithPic
                        width={this.state.width}
                        height={this.state.height}
                        source={this.props.source}
                        obj={this.props.obj}
                        onPress={this.props.onPress}
                    />
                }
                {/* <View
                    style={{
                        width: this.state.width,
                        height: this.state.height,
                        backgroundColor: this.getRandomColor(),
                        marginRight: 10,
                    }}>

                    <Text style={{ fontSize: 20 }}>{this.props.text}</Text>

                </View> */}
            </View>


        )
    };

}

export default ImgAdapter