import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { RGB_161_161_181, BLACK, WHITE } from '../helper/Color';
import { normalize } from "../helper/FontSIze";
import { TextInput, configureFonts, DefaultTheme } from "react-native-paper";
import { REGULAR, BOLD, SEMI_BOLD, MEDIUM } from '../helper/FontName'


const propTypes = {
    mapElement: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    label: PropTypes.string
};

const defaultProps = {
    mapElement: (n) => { },
    onSubmitEditing: () => { },
    onChangeText: () => { },
    value: "",
    placeholder: "",
    maxLength: 200,
    keyboardType: "default",
    secureTextEntry: false,
    label: ""
};

const styles = StyleSheet.create({
    inputBox: {
        borderRadius: 8,
        backgroundColor: WHITE,
        paddingHorizontal: 0,
        marginVertical: 8,
        fontFamily: SEMI_BOLD,
        fontSize: normalize(14)
        
    },
});

class CustomInputText extends Component {

    state = {
        value: this.props.value
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        });
    }

    onChangeText = (value) => {
        this.setState({
            value
        }, () => {
            this.props.onChangeText(value);
        })
    }

    render() {
        const { error, placeholder, secureTextEntry, keyboardType, maxLength, value, label, onChangeText, onSubmitEditing, onFocus } = this.props;

        return (
            <View>
                <TextInput
                    multiline={false}
                    numberOfLines={1}
                    mode='flat'
                    label={label}
                    theme={{
                        colors: {
                            primary: RGB_161_161_181,
                            background: WHITE
                        },
                        fonts: {
                            regular: {
                                fontFamily: MEDIUM,
                            }
                        },
                    }}
                    text={this.state.value}
                    selectionColor={BLACK}
                    style={styles.inputBox}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    returnKeyType="done"
                    value={value}
                    error={error}
                    onSubmitEditing={onSubmitEditing}
                    onFocus={onFocus}
                    onChangeText={this.onChangeText}
                />

            </View>
        );
    }
}

const fontConfig = {
    ...DefaultTheme,
    default: {

        regular: {
            fontFamily: REGULAR,
            fontWeight: 'normal'
        },

    }
}

fontConfig.ios = fontConfig.default
fontConfig.android = fontConfig.default

CustomInputText.defaultProps = defaultProps;

CustomInputText.propTypes = propTypes;

export default CustomInputText;