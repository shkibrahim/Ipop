import {LogBox, Platform, PermissionsAndroid} from 'react-native';
import {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreLogs([{level: 'error'}]);
LogBox.ignoreAllLogs();
import { SvgXml } from 'react-native-svg';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from 'react-native-splash-screen';
import {
  CardField,
  useStripe,
  StripeProvider,
} from '@stripe/stripe-react-native';

import Home from './src/screens/TabNavigator/Home';
import Login from './src/screens/Login';
import Notification from './src/screens/TabNavigator/Notification'
import Popup from './src/screens/TabNavigator/Popup'
import Chat from './src/screens/TabNavigator/Chat'
import Profile from './src/screens/TabNavigator/Profile'
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App() {


  

  useEffect(() => {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      // getEmailFromStorage();
      SplashScreen.hide();
    }
  }, []);

  return (
    // <StripeProvider
    // publishableKey="pk_test_0ELffoK5FqIkCSeNSnGu07tY"
    // merchantIdentifier=''
    // urlScheme=''
    // >

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Artist" component={Artist} /> */}

        <Stack.Screen name="Login" component={Login} />
        
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  function TabNavigator() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: 'white',
            height: 60,
            // paddingBottom: 5,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingHorizontal: 6,
          },
          tabBarActiveTintColor: '#FC1055', // Change the active tab's name color
          tabBarInactiveTintColor: 'rgb(66,67,106)', // Set the background color of the tab bar
          tabBarLabelStyle: {
            fontFamily: 'Montserrat-Regular',
            fontSize: 10,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{tabBarVisible: false ,tabBarLabel: '',
            tabBarIcon: ({color, size, focused}) => (
              <SvgXml
                width={size}
                height={size}
                xml={`


               <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.1 19.0098H16.123C16.6563 19.0098 17.1678 18.7981 17.545
 18.4212C17.9223 18.0443 18.1345 17.5331 18.135 16.9998L18.21 10.3528C18.6118 10.3399 19.0005 10.2067 19.3257 
 9.97046C19.6509 9.7342 19.8977 9.40576 20.0342 9.02765C20.1707 8.64954 20.1906 8.23913 20.0912 7.84961C19.9919 
 7.46009 19.7779 7.10939 19.477 6.84283L11.837 0.826843C11.2374 0.294804 10.4636 0.000976563 9.66203 0.000976562C8.86043 
 0.000976563 8.08662 0.294804 7.48703 0.826843L0.677033 6.84479C0.375195 7.11093 0.160665 7.46193 0.0614706 
 7.85193C-0.0377235 8.24193 -0.0169672 8.65281 0.121033 9.03082C0.264693 9.41965 0.523555 9.7554 0.863053 9.99323C1.20255 
 10.2311 1.60653 10.3596 2.02103 10.3618V16.9998C2.02183 17.5326 2.23388 18.0432 2.61069 18.4199C2.98749 18.7965
 3.49828 19.0083 4.03103 19.0088H7.74104C8.30932 19.0083 8.8542 18.7824 9.25613 18.3806C9.65807 17.9789 9.88424 
 17.4341 9.88503 16.8658V13.5998C9.8853 13.4169 9.95808 13.2415 10.0874 13.1122C10.2168 12.9828 10.3921 12.9101 
 10.575 12.9098H11.27C11.453 12.9101 11.6283 12.9828 11.7576 13.1122C11.887 13.2415 11.9598 13.4169 11.96
  13.5998V16.8708C11.9619 17.4377 12.188 17.9809 12.5889 18.3817C12.9899 18.7824 13.5331 19.0082 14.1 19.0098Z" 
  fill="${focused ? '#FC1055' : '#333333'}"/>
</svg>


              `}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{tabBarVisible: false ,tabBarLabel: '',
            tabBarIcon: ({color, size, focused}) => (
              <SvgXml
                width={size}
                height={size}
                xml={`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1271 18.1667C14.0633 18.1667 17.2542 14.9954 17.2542 11.0834C17.2542 7.17133 14.0633 
                4 10.1271 4C6.19091 4 3 7.17133 3 11.0834C3 14.9954 6.19091 18.1667 10.1271 18.1667Z" 
                stroke="${focused ? '#FC1055' : '#333333'}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20.1045 21L15.1631 16.0889" stroke="#333333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                
                

              `}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Popup"
          component={Popup}
          options={{tabBarVisible: false ,tabBarLabel: '',
            tabBarIcon: ({color, size, focused}) => (
              <SvgXml
                width={size}
                height={size}
                xml={`
                <svg width="15" height="23" viewBox="0 0 15 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.3 7.1C14.3 3.2 11.1 0 7.1 0C3.1 0 0 3.2 0 7.1C0 10.1 2 12.9 4.9 13.8C4.7 14 4.7 14.3 4.8 14.6C4.9 14.9 5.1 15 5.4 15.1C5.4 15.4 5.4 15.7 5.5 15.9V16C5.6 16.2 5.6 16.4 5.7 16.6C5.7 16.7 5.7 16.8 5.7 16.9C5.6 17 5.5 17.1 5.3 17.2C5.1 17.3 4.7 17.5 4.3 17.7C3.3 18.1 2.6 18.7 2.3 19.5C2 20 1.9 20.6 2 21.2C2.1 21.7 2.2 22 2.2 22C2.3 22.3 2.7 22.5 3 22.5C3.1 22.5 3.2 22.5 3.3 22.5H3.4C3.7 22.4 3.9 22.2 4 22C4.1 21.8 4.1 21.5 4 21.3C4 21.3 4 21.3 4 21.2C4 21.1 4 21 3.9 20.9C3.8 20.6 3.9 20.3 4 20.1C4.1 19.8 4.5 19.5 5 19.3C6.4 18.8 7.2 18.2 7.5 17.5C7.8 16.8 7.6 16.1 7.4 15.5C7.7 15.5 7.9 15.4 8.1 15.2C8.3 15 8.3 14.7 8.2 14.4L8.1 14.3C11.7 13.7 14.3 10.7 14.3 7.1ZM7.2 2.4C9.8 2.4 11.9 4.5 11.9 7.1C11.9 9.7 9.8 11.8 7.2 11.8C4.6 11.8 2.4 9.7 2.4 7.1C2.4 4.5 4.6 2.4 7.2 2.4Z" fill="url(#paint0_linear_1_10612)"/>
                <defs>
                <linearGradient id="paint0_linear_1_10612" x1="2.42283" y1="8.88502" x2="9.18572" y2="13.5661" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FC1055"/>
                <stop offset="1" stop-color="#2FDFDC"/>
                </linearGradient>
                </defs>
                </svg>
                

                `}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{tabBarVisible: false ,tabBarLabel: '',
            tabBarIcon: ({color, size, focused}) => (
              <SvgXml
                width={size}
                height={size}
                xml={`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.614 18.348C4.59531 18.5327 4.63996 18.7182 4.74062 18.8741C4.84128 19.03 4.99197 19.147 5.16794 19.206C5.34391 19.265 5.5347 19.2623 5.70898 19.1985C5.88326 19.1348 6.03066 19.0136 6.127 18.855L8.847 14.755H17.654C18.126 14.7435 18.574 14.5452 18.8999 14.2036C19.2257 13.8619 19.4027 13.405 19.392 12.933V6.55499C19.4027 6.08302 19.2257 5.62609 18.8999
                 5.28448C18.574 4.94288 18.126 4.74451 17.654 4.73297H6.354C5.88187 4.74425 5.43352 4.94249 
                 5.10745 5.28412C4.78138 5.62575 4.60426 6.08285 4.615 6.55499V11.947L4.614 18.348ZM2.014
                  7.08002V6.55499C1.98688 5.37566 2.42871 4.23377 3.24254 3.37982C4.05637 2.52587 5.17573 2.02962
                   6.355 2H17.655C18.8349 2.02884 19.9551 2.52472 20.7697 3.37872C21.5844 4.23273 22.0268 5.37506 
                   22 6.55499V12.933C22.0271 14.1132 21.5846 15.2558 20.7697 16.1099C19.9548 16.964 18.8341 17.4597
                    17.654 17.488H10.21L8.268 20.415C7.85869 21.0478 7.25112 21.5271 6.54037 21.7777C5.82962 22.0284
                     5.05581 22.0363 4.34008 21.8002C3.62435 21.5642 3.00709 21.0975 2.58492 20.4731C2.16276 19.8488 
                     1.95951 19.1021 2.007 18.35L2 7.07397L2.014 7.08002Z" fill="${focused ? '#FC1055' : '#333333'}"/>
                </svg>
                

                `}
              />
            ),
          }}
        />


<Tab.Screen
          name="Profile"
          component={Profile}
          options={{tabBarVisible: false ,tabBarLabel: '',
            tabBarIcon: ({color, size, focused}) => (
              <SvgXml
                width={size}
                height={size}
                xml={`
                <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.4752 18.4368C20.4359 15.1093 18.2372 12.9204 14.9098 12.9008C13.3393 12.891 11.7688 12.9008 10.1983 12.9008C8.5984 12.9008 6.99847 12.8812 5.38872 12.9008C2.54222 12.9499 0.431883 14.7756 0.0785242 17.5534C-0.0490776 18.6135 0.019631 19.703 0.00981552 20.7827C0.00981552 21.5188 0.431883 21.99 1.06008 21.9998C1.06989 21.9998 1.07971 21.9998 1.08952 21.9998C1.09934 21.9998 1.10915 21.9998 1.10915 21.9998H19.366C19.3758 21.9998 19.3758 21.9998 19.3857 21.9998C19.3955 21.9998 19.4053 21.9998 19.4151 21.9998C20.0335 21.99 20.4556 21.5385 20.4654 20.8318C20.485 20.0367 20.485 19.2318 20.4752 18.4368ZM2.16923 18.4073C2.19868 16.3264 3.4747 15.0504 5.55559 15.0406C8.67692 15.0308 11.7983 15.0308 14.9196 15.0406C17.0201 15.0504 18.2765 16.3068 18.3158 18.3975C18.3256 18.8785 18.3256 19.3594 18.3256 19.8404H2.15942C2.15942 19.3692 2.15942 18.8883 2.16923 18.4073Z" 
                fill="${focused ? '#FC1055' : '#333333'}"/>
                <path d="M10.169 11.8409C10.385 11.8115 10.6991 11.8017 11.0034 11.733C13.8793 11.1146 15.9798 8.07179 15.6559 4.99953C15.3811 2.42786 13.4278 0.445124 10.7678 0.0525032C8.37279 -0.300856 5.8502 1.16166 4.92754 3.46831C3.96562 5.88292 4.57418 8.03252 6.18393 9.94655C7.19493 11.1342 8.50039 11.7919 10.169 11.8409ZM6.95936 4.19465C7.57774 2.87937 8.64763 2.25118 9.83531 2.18247C12.3186 2.17266 13.9284 4.18484 13.4572 6.42278C13.2413 7.46322 12.7113 8.33681 11.8868 9.01408C10.8463 9.86803 9.53102 9.89747 8.4415 9.11223C6.88083 7.98345 6.21338 5.79458 6.95936 4.19465Z"
                fill="${focused ? '#FC1055' : '#333333'}"/>
                </svg>
                
                

                `}
              />
            ),
          }}
        />

      </Tab.Navigator>
    );
  }
}

export default App;
