import React, { useState, useEffect } from 'react';
import {
  View,
  Text,ScrollView,
  StyleSheet,
  Image,
  Pressable,Keyboard,
  TextInput,Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Regular= 'Montserrat-Regular'
const Bold = 'Montserrat-Bold'
const Semi = 'Montserrat-SemiBold'

const Pink = 'rgb(252,16,85)'
const Black = 'rgb(66,67,106)'

const Profile = ({ navigation }) => {
 

  return (
    <SafeAreaView style={{ height:'100%' }}>
   
<View>
    <Text style={{fontFamily:Bold,fontSize:20,color:"black"}}>
    Profile
    </Text>
</View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  

});

export default Profile;
