import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { WHITE } from '../helper/Color';

export default function VideoView({ onPlay }) {

    return (
        <View style={{ flex: 1, backgroundColor: WHITE, }}>

            {/* <Video
                ref={player}
                source={{ uri: video }}
                resizeMode='cover'
                style={{ margin: 10, height: 200, width: 200, resizeMode: 'cover', backgroundColor: 'black' }}
                paused={paused}
            /> */}
            <View
                style={{ margin: 10, height: 200, width: 200, resizeMode: 'cover', backgroundColor: 'black' }}
            />

            <IconButton
                icon={'play-circle'}
                color='white'
                size={45}
                onPress={onPlay}
                style={{ position: 'absolute', top: 70, bottom: 0, left: 70, right: 0 }}
            />



        </View>
    )
}