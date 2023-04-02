import React, { Component } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import RtcEngine, {
  ChannelProfile,
  ClientRole,
  RtcEngineContext,
  RtcLocalView,
  RtcRemoteView,
} from 'react-native-agora';
import { useState } from 'react';

const config = require('./agora.config.json');



const channelId="3308"

let isJoined=false
let remoteUid= []
    const switchCamera= true
      const switchRender= true
      const isRenderTextureView= false
export default class Vid extends Component {
    
     _engine=RtcEngine 
  

  UNSAFE_componentWillMount() {
    this._initEngine();
    this._joinChannel();
  }

  componentWillUnmount() {
    this._engine?.destroy();
  }

  _initEngine = async () => {
    this._engine = await RtcEngine.createWithContext(
      new RtcEngineContext(config.appId)
    );
    this._addListeners();

    await this._engine.enableVideo();
    await this._engine.startPreview();
    await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine.setClientRole(ClientRole.Broadcaster);
  };

  _addListeners = () => {
    // this._engine?.addListener('Warning', (warningCode) => {
    //   console.info('Warning', warningCode);
    // });
    // this._engine?.addListener('Error', (errorCode) => {
    //   console.info('Error', errorCode);
    // });
    this._engine?.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.info('JoinChannelSuccess', channel, uid, elapsed);
      isJoined=true
    });
    this._engine?.addListener('LeaveChannel', (stats) => {
      console.info('LeaveChannel', stats);
      isJoined=false
      remoteUid=[]
    });
    this._engine?.addListener('UserJoined', (uid, elapsed) => {
      console.info('UserJoined', uid, elapsed);
      remoteUid=[remoteUid,uid]
    });
    this._engine?.addListener('UserOffline', (uid, reason) => {
      console.info('UserOffline', uid, reason);
      remoteUid=remoteUid.filter((value) => value !== uid)
      
    });
  };

  _joinChannel = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
    await this._engine?.joinChannel(
      config.token,
      channelId,
      null,
      config.uid
    );
  };

  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
  };

//   _switchCamera = () => {
//     const { switchCamera } = this.state;
//     this._engine
//       ?.switchCamera()
//       .then(() => {
//         this.setState({ switchCamera: !switchCamera });
//       })
//       .catch((err) => {
//         console.warn('switchCamera', err);
//       });
//   };

  

  _switchRenderView = (value= boolean) => {
    isRenderTextureView=value
  };

  render() {
    //const {   switchCamera } = this.state;
    return (
      <View style={styles.container}>
        {this._renderVideo()}
        <View style={styles.float}>
          <Button
            
            title={`Camera`}
          />
        </View>
      </View>
    );
  }

  _renderVideo = () => {
    return (
      <View style={styles.container}>
        
        <RtcLocalView.SurfaceView style={styles.local} />
        
        {remoteUid !== undefined && (
          <View style={styles.remoteContainer}>
            {remoteUid.map((value, index) => (
              <TouchableOpacity
                key={index}
                style={styles.remote}
                onPress={this._switchRender}
              >
                  <RtcRemoteView.TextureView
                    style={styles.container}
                    uid={value}
                  />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  top: {
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
  },
  local: {
    flex: 1,
  },
  remoteContainer: {
    position: 'absolute',
    right: 15,
    bottom: 30,
    borderRadius: 20,
  },
  remote: {
    width: 120,
    height: 120,
  },
});
