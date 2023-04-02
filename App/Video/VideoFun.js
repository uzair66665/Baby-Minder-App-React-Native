
import React, { useEffect } from 'react'
import { Button, PermissionsAndroid, Platform, StyleSheet,Text, TouchableOpacity, View, } from 'react-native';
import RtcEngine, { ChannelProfile, ClientRole, RtcEngineContext, RtcLocalView, RtcRemoteView, } from 'react-native-agora';
const config = require('./agora.config.json');

export default function VideoFun(props,navigation) {
    const initEngine = async () => {
        console.log("#################")
        _engine = await RtcEngine.createWithContext(new RtcEngineContext(config.appId));
        addListeners();
        await this._engine.enableVideo();
        await this._engine.startPreview();
        await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
        await this._engine.setClientRole(ClientRole.Broadcaster);
        console.log("#################")
    };
    const addListeners = () => {
        var _a, _b, _c, _d;
        // this._engine?.addListener('Warning', (warningCode) => {
        //   console.info('Warning', warningCode);
        // });
        // this._engine?.addListener('Error', (errorCode) => {
        //   console.info('Error', errorCode);
        // });
        (_a = this._engine) === null || _a === void 0 ? void 0 : _a.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
            console.info('JoinChannelSuccess', channel, uid, elapsed);
            this.setState({ isJoined: true });
        });
        (_b = this._engine) === null || _b === void 0 ? void 0 : _b.addListener('LeaveChannel', (stats) => {
            console.info('LeaveChannel', stats);
            this.setState({ isJoined: false, remoteUid: [] });
        });
        (_c = this._engine) === null || _c === void 0 ? void 0 : _c.addListener('UserJoined', (uid, elapsed) => {
            console.info('UserJoined', uid, elapsed);
            this.setState({ remoteUid: [...this.state.remoteUid, uid] });
        });
        (_d = this._engine) === null || _d === void 0 ? void 0 : _d.addListener('UserOffline', (uid, reason) => {
            console.info('UserOffline', uid, reason);
            this.setState({
                remoteUid: this.state.remoteUid.filter((value) => value !== uid),
            });
        });
    };
    const _joinChannel = async () => {
        var _a;
        if (Platform.OS === 'android') {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.CAMERA,
            ]);
        }
        await ((_a = this._engine) === null || _a === void 0 ? void 0 : _a.joinChannel(config.token, this.state.channelId, null, config.uid));
    };
    useEffect(()=>{
        initEngine()
        _joinChannel();
    },[])
  return (
    <View>
      <Text>VideoFun</Text>
    </View>
  )
}

const styles = StyleSheet.create({})