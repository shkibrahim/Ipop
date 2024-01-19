import React from 'react';
import { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { PINK_RED, WHITE } from '../helper/Color';
import { MEDIUM, REGULAR } from '../helper/FontName';
import { Badge } from 'react-native-paper';

class NotificationTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: 20,
        }
    }
    render() {
        const imageFocused = require('../images/ic_notification_selected.png');
        const imageUnfocused = require('../images/ic_notification_deselected.png');
        const {
            badgeData: { data },
        } = this.props;
        let image = this.props.focused ? imageFocused : imageUnfocused;
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                }}>
                {data >= 1 && (
                    <Badge
                        theme={{
                            colors: {
                                primary: WHITE
                            },
                            fonts: {
                                regular: {
                                    fontFamily: MEDIUM
                                }
                            }
                        }}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 8
                        }}
                    >
                        {data}
                    </Badge>

                )}
                <Image
                    source={image}
                    style={{ width: 24, height: 24 }}
                    resizeMode={'contain'}
                />
            </View>
        );
    }

};
mapStateToProps = (state) => ({
    badgeData: state.badgeReducer.badgeData
})

export default connect(mapStateToProps, null)(NotificationTab)