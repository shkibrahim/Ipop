import React from 'react';
import { Component } from 'react';
import { View, Text, Modal, StyleSheet, FlatList } from 'react-native';
import { Checkbox, Divider, IconButton } from 'react-native-paper';
import { BLACK, PINKISH_GREY, PINK_RED, RGB_161_161_181 } from '../helper/Color';
import { SEMI_BOLD, MEDIUM } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import CustomButton from './CustomButton';
import { translate } from '../helper/Language';

export default class SubMenuSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            arrSubMenu: props.arrSubMenu
        };
    }
    shouldComponentUpdate(nextProps) {
        if (this.props != nextProps && this.props.visible != nextProps.visible) {
            this.setState({
                visible: nextProps.visible
            })
        } else if (this.props != nextProps && this.props.arrSubMenu != nextProps.arrSubMenu) {
            this.setState({
                arrSubMenu: nextProps.arrSubMenu
            })
        }
        return true
    }
    renderOptions({ item, index, onPress }) {
        return (
            <View style={{ marginVertical: 10, marginHorizontal: 15 }} key={index.toString()}>
                <View
                    style={{
                        marginBottom: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    key={index.toString()}
                >

                    <Checkbox.Android
                        value={item.isSelect}
                        color={PINK_RED}
                        uncheckedColor={PINKISH_GREY}
                        status={item.isSelect === true ? 'checked' : 'unchecked'}
                        onPress={onPress}
                    />

                    <Text style={styles.floatingValue}>{item.name}</Text>

                </View>
                <Divider style={{ marginTop: 8, height: 2 }} theme={{
                    colors: {
                        primary: RGB_161_161_181
                    }
                }} />
            </View>
        )
    }
    render() {
        return (
            <Modal
                statusBarTranslucent={true}
                animationType="fade"
                transparent={true}
                visible={this.state.visible}>

                <View style={styles.container}>

                    <View style={styles.popup}>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginTop: 10
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: SEMI_BOLD,
                                    fontSize: normalize(18),
                                    color: BLACK,
                                    marginLeft: 20
                                }}
                            >
                                {translate('subMenu')}
                            </Text>
                            <IconButton
                                icon={'close'}
                                size={24}
                                style={{ alignSelf: 'flex-end' }}
                                color={PINK_RED}
                                onPress={() => {
                                    this.props.closePopup()
                                }}
                            />
                        </View>

                        <FlatList
                            data={this.state.arrSubMenu}
                            renderItem={({ item, index }) => {
                                
                                return <View style={{ marginVertical: 10, marginHorizontal: 15 }} key={index.toString()}>
                                    <View
                                        style={{
                                            marginBottom: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                        key={index.toString()}
                                    >

                                        <Checkbox.Android
                                            value={item.isSelect}
                                            color={PINK_RED}
                                            uncheckedColor={PINKISH_GREY}
                                            status={item.isSelect === true ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                let arrSubMenu = this.state.arrSubMenu
                                                arrSubMenu.map((objData, tempIndex) => {
                                                    if (tempIndex == index) {
                                                        objData.isSelect = !objData.isSelect
                                                    }
                                                })
                                                this.setState({
                                                    arrSubMenu: arrSubMenu
                                                })
                                            }}
                                        />

                                        <Text style={styles.floatingValue}>{item.name}</Text>

                                    </View>
                                    <Divider style={{ marginTop: 8, height: 2 }} theme={{
                                        colors: {
                                            primary: RGB_161_161_181
                                        }
                                    }} />
                                </View>
                            }}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index}
                        />
                        <View style={{ marginBottom: 20, marginTop: 30 }}>

                            <CustomButton
                                text={translate('Save')}
                                isDisable={this.state.arrSubMenu.filter((objData) => { return objData.isSelect }).length <= 0}
                                onPress={() => {

                                    this.props.onSave(this.state.arrSubMenu)

                                }} />

                        </View>

                    </View>
                </View>
            </Modal>
        );
    }
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
        width: '90%',
        maxHeight: "50%"
    },
    floatingValue: {
        fontFamily: MEDIUM,
        fontSize: normalize(15),
        color: 'black',
    },

})
