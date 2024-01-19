import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { PINK_RED, WHITE_TWO } from '../helper/Color';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';

export default function CustomButton({ text, onPress, isDisable = false }) {
    return (

        <Button
            mode='contained'
            uppercase={false}
            contentStyle={{
                width: "100%",
                marginVertical: 5,
                backgroundColor: isDisable ? WHITE_TWO : PINK_RED
            }}
            labelStyle={styles.buttonText}
            disabled={isDisable}
            theme={{
                roundness: 100,
                dark: true,
                mode: 'exact',
                colors: {
                    primary: isDisable ? WHITE_TWO : PINK_RED
                }
            }}
            onPress={isDisable ? null : onPress}>{text}
        </Button>

    );
}

const styles = StyleSheet.create({

    buttonText: {
        color: 'white',
        fontFamily: SEMI_BOLD,
        fontSize: normalize(20),
        textAlign: 'center',
        letterSpacing: 0
    }
});