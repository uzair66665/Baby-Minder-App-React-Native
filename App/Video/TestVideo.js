import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  View,
  Text
} from 'react-native';
//import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import RtcEngine, {
  ChannelProfile,
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';
import requestCameraAndAudioPermission from './Permission';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function TestVideo({ route }) {
  const isBroadcaster = 1 === 'create';
  const channelId = "3308";

  const [joined, setJoined] = useState(false);

  const AgoraEngine = useRef();

  useEffect(() => {
    if (Platform.OS === 'android') requestCameraAndAudioPermission();
    const uid = isBroadcaster ? 1 : 0;
    init().then(() =>
      AgoraEngine.current.joinChannel(null, channelId, null, uid),
    );
    return () => {
      AgoraEngine.current.destroy();
    };
  }, []);

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create('9f7d70026f394000ac570654751c2037');
    AgoraEngine.current.enableVideo();
    AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
    if (isBroadcaster)
      AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

    AgoraEngine.current.addListener(
      'JoinChannelSuccess',
      (channelId, uid, elapsed) => {
        console.log('JoinChannelSuccess', channelId, uid, elapsed);
        setJoined(true);
      },
    );
  };

  const onSwitchCamera = () => AgoraEngine.current.switchCamera();

  return (
    <View style={styles.container}>
      {!joined ? (
        <>
          <ActivityIndicator
            size={60}
            color="#222"
            style={styles.activityIndicator}
          />
          <Text style={styles.loadingText}>
            {'Joining Stream, Please Wait'}
          </Text>
        </>
      ) : (
        <>
          {isBroadcaster ? (
            <RtcLocalView.SurfaceView
              style={styles.fullscreen}
              channelId={channelId}
            />
          ) : (
            <RtcRemoteView.SurfaceView
              uid={1}
              style={styles.fullscreen}
              channelId={channelId}
            />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
              <Text style={styles.buttonText}>{'Switch Camera'}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 18,
    color: '#222',
  },
  fullscreen: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});