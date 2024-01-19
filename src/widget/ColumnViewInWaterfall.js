import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import WaterfallItem from './WaterfallItem.js';
import styles from './styles';


class ColumnView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalHeight: 0,
            dataSource: [],
        };
    }

    // getHeight = () => {
    //     let totalHeight = 0;
    //     for (let i = 0; i < this.state.dataSource.length; ++i) {
    //         totalHeight += this.refs['wfItem_' + i].getHeight();
    //     }
    //     return totalHeight;
    // }

    // addItem = async (item) => {
    //     this.state.dataSource.push(item);
    //     this.setState({});
    // }

    // clearData = () => {
    //     this.state.dataSource.splice(0, this.state.dataSource.length);
    //     this.setState({});
    // }

    // _showItems = () => {
    //     let items = [];
    //     for (let i = 0; i < this.state.dataSource.length; ++i) {
    //         items.push(<WaterfallItem source={this.state.dataSource[i]} width={this.props.width} ref={'wfItem_' + i} />);
    //     }
    //     return items;
    // }
    
    _showItems = () => {
        let items = [];
        for (let i = 0; i <this.props.dataSet.length; ++i) {
            items.push(<WaterfallItem source={this.props.dataSet[i]} width={this.props.width} key={i} onPress={this.props.onPress}/>);
        }
        return items;
    }

    render() {
        return (
            <View
                style={{ flexDirection: 'column', backgroundColor: this.props.bgColor, width: this.props.width }}>
                {this._showItems()}
            </View>
        )
    };
}



export default ColumnView 