import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { CHARCOAL_GREY, GREYISH_BROWN, PINK_RED } from '../helper/Color';
import { SEMI_BOLD, MEDIUM } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';


export default function MenuPopup({ visible, handleChanges, objMenu }) {



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
                        onPress={handleChanges}
                    />

                    <Text allowFontScaling={false} style={styles.title}>{objMenu != undefined ? objMenu.title : ''}</Text>

                    <Text allowFontScaling={false} style={styles.content}>{objMenu != undefined ? objMenu.description : ''}</Text>

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
        width : '80%'
    },
    title: {
        fontFamily: SEMI_BOLD,
        fontSize: normalize(18),
        color: CHARCOAL_GREY,
        textAlign:'center'
    },

    content: {
        fontFamily: MEDIUM,
        fontSize: normalize(14),
        color: GREYISH_BROWN,
        marginVertical: 20,
        textAlign:'center'
    },
})


