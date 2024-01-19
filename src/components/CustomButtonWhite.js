import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PINK_RED, WHITE_TWO } from '../helper/Color';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';

export default function CustomButtonWhite({ text, onPress, color }) {
    return (

        <Button
            style={{
                flex: 1,
                marginHorizontal: 2
            }}
            mode='contained'
            uppercase={false}
            contentStyle={{
                marginVertical: 5,
                backgroundColor: color === 'white' ? WHITE_TWO : PINK_RED
            }}
            labelStyle={styles.buttonText}
            theme={{
                roundness: 10,
                dark: true,
                mode: 'exact',
                colors: {
                    primary: color === 'white' ? WHITE_TWO : PINK_RED
                }
            }}
            onPress={onPress}>{text}
        </Button>

    );
}

const styles = StyleSheet.create({
    // button: {
    //     width: "100%",
    //     marginVertical: 5,
    //     backgroundColor: disable ? PINK_RED_ALPHA : PINK_RED
    // },
    buttonText: {
        color: 'white',
        fontFamily: SEMI_BOLD,
        fontSize: normalize(16),
        textAlign: 'center',
        letterSpacing: 0
    }
});