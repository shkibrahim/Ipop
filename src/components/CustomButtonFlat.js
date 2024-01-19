import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PINK_RED, PINK_RED_ALPHA } from '../helper/Color';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';

export default function CustomButtonFlat({ text, onPress, disable = false }) {
    return (

        <Button
            mode='contained'
            uppercase={false}
            contentStyle={{
                width: "100%",
                marginVertical: 5,
                backgroundColor: disable ? PINK_RED_ALPHA : PINK_RED
            }}
            labelStyle={styles.buttonText}
            disabled={disable}
            theme={{
                roundness: 10,
                dark: true,
                mode: 'exact',
                colors: {
                    primary: disable ? PINK_RED_ALPHA : PINK_RED,
                    disabled : PINK_RED_ALPHA
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