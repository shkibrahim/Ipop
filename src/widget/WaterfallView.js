import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    RefreshControl
} from 'react-native';

import ColumnView from './ColumnViewInWaterfall.js';

export default class WaterfallDoubleView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: parseInt(this.props.number),
            displayItemList: [],
            isRefresh: false
        };

        this['viewsInside_0'] = React.createRef()
        this['viewsInside_1'] = React.createRef()
    }

    getMinimumHieghtIndex = (array) => {
        let minIndex = 0
        let min = array[0]
        for (let i = 0; i < array.length; i++) {
            let temp = array[i]
            if (min > temp) {
                min = temp
                minIndex = i
            }
        }
        return minIndex
    }

    _getViews() {

        let minHeight = []
        let mainDataSet = []
        let dataSet1 = []
        let dataSet2 = []

        for (let i = 0; i < this.state.number; i++) {
            minHeight.push(0)
        }

        for (let i = 0; i < this.props.displayItemList.length; i++) {

            let index = this.getMinimumHieghtIndex(minHeight)

            if (index === 0) {
                dataSet1.push(this.props.displayItemList[i])
            } else {
                dataSet2.push(this.props.displayItemList[i])
            }
            minHeight[index] = minHeight[index] + this.props.displayItemList[i].height

        }
        mainDataSet.push(dataSet1)
        mainDataSet.push(dataSet2)

        let width = (Dimensions.get('window').width - 2 * this.state.number + 2) / this.state.number;
        console.log(width)
        let viewsInside = [];
        for (var i = 0; i < this.state.number; i++) {
            viewsInside.push(<ColumnView dataSet={mainDataSet[i]} width={width} bgColor={this.props.bgColor} ref={this[`viewsInside_${i}`]} key={'viewsInside_' + i} onPress={this.onPress} />);
            if (i < this.state.number - 1) {
                viewsInside.push(<View style={{ width: 2, backgroundColor: this.props.bgColor }} key={'seprator_' + i}></View>);
            }
        }
        return viewsInside;
    }

    // _getShortestView() {
    //     let order = 0;
    //     //let minHeight = this.refs['viewsInside_' + 0].getHeight();
    //     let minHeight = this[`viewsInside_` + 0].current.getHeight();
    //     for (let i = 0; i < this.state.number; i++) {
    //         let tmpHeight = this[`viewsInside_${i}`].current.getHeight();
    //         if (minHeight > tmpHeight) {
    //             minHeight = tmpHeight;
    //             order = i;
    //         }
    //     }
    //     return this[`viewsInside_${order}`].current;
    // }

    // clear() {
    //     for (let i = 0; i < this.state.number; i++) {
    //         this[`viewsInside_${i}`].clearData();
    //     }
    // }
    // addItem(item) {
    //     this.state.displayItemList.push(item);
    //     this._getShortestView().addItem(window.tmpData[window.tmpDataCount]);
    // }


    //   ListFooterComponent={this.renderFooter.bind(this)}
    //   onEndReachedThreshold={0.4}
    //   onEndReached={this.handleLoadMore.bind(this)}

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
    }

    onPress = (obj) => {
        this.props.onPress(obj)
    }

    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={this.props.refreshControl}
                onScroll={({ nativeEvent }) => {
                    if (this.isCloseToBottom(nativeEvent)) {
                        this.props.handleLoadMore()
                    }
                }}
                scrollEventThrottle={440}
            >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {this._getViews()}
                </View>
            </ScrollView>
        );
    }
};
