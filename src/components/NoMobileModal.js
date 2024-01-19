import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { CHARCOAL_GREY, GREYISH_BROWN, PINK_RED } from '../helper/Color';
import { SEMI_BOLD, MEDIUM } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import { translate } from '../helper/Language';


export default function NoMobile({ visible, handleChanges }) {



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
                        onPress={() => handleChanges(0)}
                    />

                    <Text allowFontScaling={false} style={styles.title}>{translate("noMobile")}</Text>

                    <Text allowFontScaling={false} style={styles.content}>{translate("noMobileTicketPurchase")}</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20, }}>

                        <Button
                            style={{ width: '80%', borderWidth: 1, borderColor: PINK_RED }}
                            mode='contained'
                            uppercase={false}
                            contentStyle={styles.button1}
                            labelStyle={styles.buttonText1}
                            onPress={() => handleChanges(1)}
                            theme={{
                                roundness: 100,
                                dark: true,
                                mode: 'exact',
                                colors: {
                                    primary: 'white'
                                }
                            }}>{translate('Edit')}
                        </Button>

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
        marginHorizontal: 9,
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


