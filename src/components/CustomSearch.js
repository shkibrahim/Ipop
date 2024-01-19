import React, { Component } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import { LIGHTPURPLE_SEARCHVIEW, SEARCH_PLACEHOLDERGRAY } from '../helper/Color';
import { MEDIUM, SEMI_BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
import { translate } from '../helper/Language';

export default function CustomSearch({ onChangeText }) {
    return (
        <View>
            <View style={style.SearchView}>
                <Image source={require('../images/search.png')} style={{ height: 20, width: 20, margin: 10 }} />
                <TextInput
                    placeholder={translate("Search")}
                    placeholderTextColor={SEARCH_PLACEHOLDERGRAY}
                    style={style.SearchBar}
                    multiline={false}
                    onChangeText={onChangeText}
                    clearButtonMode="while-editing"
                >

                </TextInput>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    SearchView: {
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 5,
        backgroundColor: LIGHTPURPLE_SEARCHVIEW,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    SearchBar: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: normalize(15),
        fontFamily: SEMI_BOLD,
        width: '90%',
        backgroundColor: LIGHTPURPLE_SEARCHVIEW,
    }
})