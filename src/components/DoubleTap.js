import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
export default class DoubleTap extends React.Component {
    static defaultProps = {
        delay: 300,
        onDoubleTap: () => null,
    };
    handleDoubleTap = () => {
        const now = Date.now();
        if (this.lastTap && (now - this.lastTap) < this.props.delay) {
            this.props.onDoubleTap();
        } else {
            this.lastTap = now;
        }
    }
    render() {
        return (
            <TapGestureHandler
                onHandlerStateChange={(event) => {
                    if (event.nativeEvent.state === State.ACTIVE) {
                        this.props.onDoubleTap();
                    }
                }}
                numberOfTaps={2}
            >
                {this.props.children}
            </TapGestureHandler>
        );
    }
};