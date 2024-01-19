import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
} from 'react-native';
const Card = props => {
  const { children, elevation, opacity, cornerRadius } = props;

  const cardStyle = Platform.select({
    ios: () => 
      StyleSheet.create({
        container: {
          shadowColor:'#3a4c82',
          shadowRadius:elevation, 
          shadowOpacity:opacity, 
          shadowOffset:{ width: 0, height: elevation },
          borderRadius:cornerRadius,
          backgroundColor: props.backgroundColor,
        }
      }),
    android: () => 
      StyleSheet.create({
        container: {
          elevation:elevation,
          borderRadius:cornerRadius, 
          backgroundColor: props.backgroundColor,
        }
      })
  })();

  return(
    <View style={[cardStyle.container, props.style]}>
      {children}
    </View>
  )

}

Card.prototype = {
  backgroundColor: PropTypes.string,
  elevation: PropTypes.number,
  cornerRadius: PropTypes.number,
  opacity: PropTypes.number
}

Card.defaultProps = {
  backgroundColor: '#ffffff',
  elevation: 3,
  cornerRadius: 10,
  opacity: .5,
}

export default Card