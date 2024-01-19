import React, { Component,useState } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Modal,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import AnimatedLoader from "react-native-animated-loader";

const Loader = ({ setLoading }) => {
    const [isLoading, setIsLoading] = useState();
  
    return (
      <AnimatedLoader
        visible={isLoading}
        overlayColor="rgba(255,255,255,0.50)"
        source={require("../others/loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      >
        {/* Your loader content */}
      </AnimatedLoader>
      // Uncomment the following lines if you want to use a Modal instead
      // <Modal
      //   transparent={true}
      //   animationType={'none'}
      //   visible={isLoading}
      //   onRequestClose={() => { console.log('close modal') }}>
      //   <View style={styles.modalBackground}>
      //     <View style={styles.activityIndicatorWrapper}>
      //       <ActivityIndicator
      //         size='small'
      //         color='black'
      //         animating={isLoading} />
      //     </View>
      //   </View>
      // </Modal>
    );
  }
  


const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100,
      },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }

})
mapStateToprops = (state) => ({
    setLoading: state.loaderReducer.setLoading
})

export default Loader;