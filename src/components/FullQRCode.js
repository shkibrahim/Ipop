import React from 'react';
import { View, Modal, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IconButton } from 'react-native-paper';
import { CHARCOAL_GREY, GREYISH_BROWN, PINK_RED, WHITE } from '../helper/Color';
import { SEMI_BOLD, MEDIUM } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import ProgressiveImage from './LoadImage';
import QRCode from 'react-native-qrcode-svg';


export default function FullQRCode({ visible, qrCode, closeModel, jsonVal = undefined }) {



    return (
        <Modal
            statusBarTranslucent={true}
            animationType="fade"
            transparent={true}
            visible={visible}>

            <View style={styles.container}>

                <View style={styles.popup}>
                    <IconButton
                        icon={'close'}
                        size={24}
                        style={{ alignSelf: 'flex-end' }}
                        color={PINK_RED}
                        onPress={() => closeModel()}
                    />
                    <View style={{alignSelf: 'center'}}>
                    {
                        jsonVal != undefined ?
                            <QRCode
                                value={JSON.stringify(jsonVal)}
                                size={200}
                            />
                            :
                            <ProgressiveImage
                                source={{ uri: qrCode }}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{ width: '100%', aspectRatio: 1, }}
                            />
                    }

                    </View>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    popup: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingBottom: 20,
        paddingHorizontal: 10,
        margin: 20,
        width:"80%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontFamily: SEMI_BOLD,
        fontSize: normalize(24),
        color: CHARCOAL_GREY,
        textAlign: 'center',
        // marginTop: 
    },

    content: {
        fontFamily: MEDIUM,
        fontSize: normalize(14),
        color: GREYISH_BROWN,
        marginVertical: 20,
        textAlign: 'center'
    },

    button: {
        backgroundColor: PINK_RED,
        marginVertical: 5
    },
    button1: {
        backgroundColor: 'white',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontFamily: SEMI_BOLD,
        fontSize: normalize(15),
        textAlign: 'center',
        letterSpacing: 0
    },
    buttonText1: {
        color: PINK_RED,
        fontFamily: SEMI_BOLD,
        fontSize: normalize(15),
        textAlign: 'center',
        letterSpacing: 0
    }

})


