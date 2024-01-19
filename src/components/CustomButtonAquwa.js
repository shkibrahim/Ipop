import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { ICECOOL, AQUWA_MARINE ,EVERGREEN} from '../helper/Color';
import { SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';

export default function CustomButtonAquwa({ text, onPress }) {
    return (

        <Button
            mode='contained'
            uppercase={false}
            contentStyle={styles.button}
            labelStyle={styles.buttonText}
            theme={{
                roundness: 100,
                // dark: true,
                // mode:'exact',
                colors:{
                    primary:ICECOOL
                }
            }}
            style={{  borderWidth: 2 , borderColor: AQUWA_MARINE}}
            onPress={onPress}>{text}
           
        </Button>

    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        paddingVertical : 5 ,
    },
    buttonText: {
        color: EVERGREEN,
        fontFamily: SEMI_BOLD,
        fontSize: normalize(16),
        letterSpacing:0
        // textAlign: 'center',
    }
});