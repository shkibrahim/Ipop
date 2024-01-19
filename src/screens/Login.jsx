// font "PT Serif Regular"

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground , Image, Pressable,
    TouchableOpacity,ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../components/Loader';
import GlobleStyles from '../helper/GlobleStyles';
import { normalize } from '../helper/FontSIze';
import { useDispatch } from 'react-redux';
import appleAuth, {
    AppleButton,
  } from '@invertase/react-native-apple-authentication'
import {
    
    TextInput,
    Button,
    ActivityIndicator,
  } from 'react-native-paper';
// import { translate } from '../helper/Language';
const Login = ({navigation}) => {

 
     // Include all relevant dependencies
      
  const [Email,setEmail] = useState();
  const [Password,setPassword] = useState();
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);


  const[isValid, setisValid] = useState(true)
const[error,setError] = useState();
  const Regular= 'Montserrat-Regular'
  const Bold = 'Montserrat-Bold'
  const Semi = 'Montserrat-SemiBold'
const [isDisable,setisDisable] = useState(false)
 const Pink = 'rgb(252,16,85)'
 const Black = 'rgb(66,67,106)'

 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const a = emailRegex.test(Email)
const Signin = ()=>{
   
 



    if (!emailRegex.test(Email) ||  Email === '')

    {
        setIsUsernameEmpty(true)
        setError(true)

    }



    if(Password === ''){
        setIsPasswordEmpty(true)
        setError(true)
    }




    if(Password !== '' && a  &&  Email !== '' ){


        navigation.navigate('TabNavigator')
    }


}




useEffect(() => {
    console.log('svsv');
  
    // Check for non-empty fields and update error state
    if (Email !== '' && a) {
      setIsUsernameEmpty(false);
    } 
  
    if (Password !== '') {
      setIsPasswordEmpty(false);
    } else {
      setIsPasswordEmpty(true);
    }
  
    // Additional logic based on your requirements
  
  }, [Email, Password, isUsernameEmpty,isPasswordEmpty]); // Include all relevant dependencies
  




  return (
<SafeAreaView style={{paddingLeft: 30, paddingRight: 30, backgroundColor: 'white',flex:1 }}>
   



     <View>
     <ScrollView showsVerticalScrollIndicator={false}>
          <Loader />

          <Image
            style={{ height: 110, width: 110, marginTop: 20 }}
            source={require('../images/popup_logo.png')}
          />



<Text style={[GlobleStyles.font34SemiBoldBlack, { marginTop: 30 ,color:'black',fontFamily:Bold,color:'rgb(51,51,51)'}]}>
           Hello!
          </Text>







          <TextInput
          
            theme={{colors: {primary: 'rgb(161,161,181)', placeholder: "rgb(161,161,181)",fontFamily:Regular}}}
    //   underlineColor="rgb(161,161,181)" // Set underline color here
      placeholderTextColor="rgb(161,161,181)"
    
      textColor="black"
      labelStyle={{ color: 'rgb(252,16,85)' }}
      style={{color:'rgb(252,16,85)',  backgroundColor:"white",   borderRadius: 8,
      backgroundColor: 'white',
      paddingHorizontal: 0,
      marginVertical: 8,color:'black',
      underlineColor:"transparent",
      fontFamily: Regular,
      fontSize: 16}}
      cursorColor="rgb(252,16,85)"
      label="Email"
    

      setError={setIsUsernameEmpty} required={true} error={isUsernameEmpty}
      value={Email}
      onChangeText={setEmail}
     
      multiline={false}
                    numberOfLines={1}
                    mode='flat'
   
    />
     {
          isUsernameEmpty ? <Text style={{ color: 'red', marginTop: 4 ,fontFamily:Regular}}>Please enter valid email</Text> : null
        }

          <TextInput
               theme={{primary: 'rgb(161,161,181)', placeholder: "rgb(161,161,181)",fontFamily:Regular}}
    //   underlineColor="rgb(252,16,85)" // Set underline color here
      placeholderTextColor="rgb(161,161,181)"
    //   selectionColor="rgb(252,16,85)"
    style={{color:'rgb(252,16,85)',  backgroundColor:"white",   borderRadius: 8,
      backgroundColor: 'white',
      paddingHorizontal: 0,
      marginVertical: 8,color:'black',
      underlineColor:"transparent",
      fontFamily: Regular,
      fontSize: 16}}
      cursorColor="rgb(252,16,85)"
      label="Password"
      labelStyle={{ color: 'rgb(252,16,85)' }}
      value={Password}
      onChangeText={setPassword}
      secureTextEntry={true}
      multiline={false}
                    numberOfLines={1}
                    mode='flat'
      error={isPasswordEmpty}
      setError={setIsPasswordEmpty}
    />

{
          isPasswordEmpty ? <Text style={{ color: 'red', marginTop: 4 ,fontFamily:Regular}}>Please enter Password</Text> : null
        }


<Text
              style={[
                GlobleStyles.font12RegularGrey,
                { color: 'rgb(252,16,85)', alignSelf: 'flex-end' ,marginBottom:32},
              ]}>
             Forgot Password?
            </Text>

            {/* <Button
            mode='contained'
            uppercase={false}
            contentStyle={{
                width: "100%",
                
          height:60,
          alignItems:'center',
          alignSelf:'center',
                // paddingVertical:5,
                backgroundColor: isDisable ? '#E0E0E0' : 'rgb(252,16,85)'
            }}
            labelStyle={{     color: 'white',
            fontFamily: Semi,
            fontSize: normalize(20),
            
            textAlign: 'center',
            letterSpacing: 0}}
            disabled={isDisable}
            theme={{
                roundness: 100,
                dark: true,
                mode: 'exact',
                colors: {
                    primary: isDisable ? '#E0E0E0' : 'rgb(252,16,85)'
                }
            }}
            onPress={isDisable ? null : Signin}>Sign In
        </Button> */}

<TouchableOpacity style={{alignItems:'center',marginBottom:30, justifyContent:"center",width:'100%',height:55,backgroundColor: isDisable ? '#E0E0E0' : 'rgb(252,16,85)',
borderRadius:38,padding:12}}
activeOpacity={0.7}
onPress={isDisable ? null : Signin}>
    <Text style={{ 
                
                
                color: 'white',
                fontFamily: Semi,
                fontSize: normalize(20),
                alignSelf:'center',}}>Sign In </Text>
</TouchableOpacity>
      



<Text style={[GlobleStyles.font12RegularGrey, { color: 'rgb(66,67,106)', marginTop: 15 }]}>or Sign in with</Text>



<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
            <View style={styles.addShadow} >
              <TouchableOpacity activeOpacity={0.6} onPress={() => this.signinWithGoogle()}>
                <Image style={styles.buttonStyle} source={require('../images/google.png')} />
              </TouchableOpacity>
            </View>

            <View style={styles.addShadow}>
              <TouchableOpacity activeOpacity={0.6} onPress={() => this.signinWithFacebook(this)}>
                <Image style={styles.buttonStyle} source={require('../images/facebook.png')} />
              </TouchableOpacity>
            </View>
          </View>


          {
            appleAuth.isSupported && <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.CONTINUE}
              style={styles.appleButton}
              onPress={() => this.signinWithApple()}
            />
          }

          <View style={{alignItems:'center',flexDirection:'row'}}>
            <Text style={{color:Black,fontFamily:Semi, fontSize: normalize(14),
    marginTop: Platform.OS == "android" ? 30 : 20}}> Siging in you accept our </Text>
            <TouchableOpacity>
                <Text style={{color:Pink,fontFamily:Semi,fontSize: normalize(14),
    marginTop: Platform.OS == "android" ? 30 : 20}}>Terms of</Text>
            </TouchableOpacity>
          </View>

          <View style={{alignItems:'center',flexDirection:'row'}}>

          <TouchableOpacity>
                <Text style={{color:Pink,fontFamily:Semi,fontSize: normalize(14),
   }}>Service</Text>
            </TouchableOpacity>
            <Text style={{color:Black,fontFamily:Semi, fontSize: normalize(14),
    }}> and </Text>
            <TouchableOpacity>
                <Text style={{color:Pink,fontFamily:Semi,fontSize: normalize(14),
   }}>Privacy Policy.</Text>
            </TouchableOpacity>
          </View>



          <View style={{alignItems:'center',flexDirection:'row',}}>
            <Text style={{color:Black,fontFamily:Semi, fontSize: normalize(14),
    marginTop: Platform.OS == "android" ? 20 : 20}}>Don't have an account </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <Text style={{color:Pink,fontFamily:Bold,fontSize: normalize(14),
    marginTop: Platform.OS == "android" ? 20 : 20}}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          
          </ScrollView>
     </View>





          

       
       
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({




    buttonStyle: {
        height: 60,
        width: 60,
        // marginRight: 15,
        borderRadius: 30,
      },
      addShadow: {
        height: 60,
        width: 60,
        marginLeft: 25,
        marginRight: 15,
        shadowColor: '#4e4f72',
        shadowOpacity: 0.4,
        shadowRadius: 30,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        borderRadius: 30,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },



  
  addShadow: {
    height: 60,
    width: 60,
    marginLeft: 25,
    borderRadius:60,
    borderColor:'black',
    marginRight: 15,
    shadowColor: '#4e4f72',
    shadowOpacity: 0.4,
    shadowRadius: 30,
    shadowOffset: {
      height: 0,
      width: 0,
    },
},




});

export default Login;
