import React, { Component, useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { PINK_RED } from '../helper/Color';
import { BOLD } from '../helper/FontName';
import { normalize } from '../helper/FontSIze';
//import AudioRecorderPlayer from 'react-native-audio-recorder-player';


export default function RecordingModel({ visible, handleChanges }) {

    const path = Platform.select({
        ios: (new Date()).getTime() + '.m4a',
        android: 'sdcard/' + (new Date()).getTime() + '.mp4', // should give extra dir name in android. Won't grant permission to the first level of dir.
    });
    useEffect(() => {

        this.audioRecorderPlayer = new AudioRecorderPlayer()

        return () => {
            this.audioRecorderPlayer.stopPlayer();
            this.audioRecorderPlayer.removePlayBackListener();


        }

    }, []);

    const [recordSecs, setRecordSecs] = useState(0)
    const [recordTime, setRecordTime] = useState(0)
    const [isRecordingStarted, setRecordingStarted] = useState(true)
    const [recording, setRecording] = useState('')



    const onStartRecord = async () => {
        const result = await this.audioRecorderPlayer.startRecorder(path);
        setRecordingStarted(false)
        this.audioRecorderPlayer.addRecordBackListener((e) => {
            setRecordSecs(e.current_position)
            setRecordTime(this.audioRecorderPlayer.mmssss(
                Math.floor(e.current_position),
            ))
            return;
        });
        setRecording(result)
        console.log(result);
    };

    const onStopRecord = async () => {

        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        setRecordSecs(0)
        console.log(result);
    };

    const onStartPlay = async () => {
        console.log('onStartPlay');
        const msg = await this.audioRecorderPlayer.startPlayer(recording);
        console.log(msg);
        this.audioRecorderPlayer.addPlayBackListener((e) => {
            if (e.current_position === e.duration) {
                console.log('finished');
                this.audioRecorderPlayer.stopPlayer();
            }
            return;
        });
    };

    return (
        <Modal
            statusBarTranslucent={true}
            animationType="fade"
            transparent={true}
            visible={visible}>

            <View style={styles.container}>

                <View style={styles.popup}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text allowFontScaling={false} style={styles.title}>Record Audio</Text>
                        <IconButton
                            icon="close"
                            size={24}
                            color={PINK_RED}
                            onPress={() => {
                                console.log('onStopPlay');
                                this.audioRecorderPlayer.stopPlayer();
                                this.audioRecorderPlayer.removePlayBackListener();
                                setRecordSecs(0)
                                setRecordTime(0)
                                setRecordingStarted(true)
                                setRecording('')
                                handleChanges(false)
                            }}
                            style={{ position: 'absolute', right: 0 }}
                        />
                    </View>

                    <Text allowFontScaling={false} style={styles.seconHeader}> Secs : {recordSecs} {'\n'} Time :{recordTime}</Text>

                    <IconButton
                        icon={isRecordingStarted ? 'play-circle' : 'pause-circle'}
                        size={30}
                        color={PINK_RED}
                        onPress={() => isRecordingStarted ? onStartRecord() : onStopRecord()}
                        style={{ alignSelf: 'center' }}
                    />

                    {/* <IconButton
                        icon="pause-circle"
                        size={30}
                        color={PINK_RED}
                        onPress={() => onStopRecord(false)}
                        style={{ alignSelf: 'center' }}
                    /> */}

                    <IconButton
                        icon="play"
                        size={30}
                        color={PINK_RED}
                        onPress={() => onStartPlay(false)}
                        style={{ alignSelf: 'center' }}
                    />

                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    popup: {
        backgroundColor: 'white',
        borderRadius: 8,
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
        fontFamily: BOLD,
        fontSize: normalize(18),
        color: PINK_RED,
        flex: 1,
        textAlign: 'center',
        marginTop: 20
    },
})


