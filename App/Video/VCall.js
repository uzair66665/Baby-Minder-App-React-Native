import React, { Component } from 'react';
import { useRoute } from '@react-navigation/native';
import { Button,Image, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View, } from 'react-native';
import RtcEngine, { ChannelProfile, ClientRole, RtcEngineContext, RtcLocalView, RtcRemoteView, } from 'react-native-agora';
const config = require('./agora.config.json');

export default class VCall extends Component {
    
    constructor(props) {
        super(props);
        this.disconectcall=async()=>{
            try {
                const response = await fetch(global.ip+"notification/disconnectcall?id="+global.pid);
                  const json = await response.json();
                 console.log(json);
                  
              }
              catch (error) {
                console.log("Post submission failed");
                console.log(error.message);
              }
        }
        this.endfun=async ()=>{
            try {
                // const response = await fetch(global.ip+"notification/checknotification?id="+global.pid);
                //   const json = await response.json();
                  console.log(global.role)
                  if(global.role=="parent")
                  {
                    this.disconectcall();
                    this.props.navigation.navigate("ParentHome")
                  }
                  else
                  {
                    this.props.navigation.navigate("ChildHome")
                  }
                  
              }
              catch (error) {
                console.log("Post submission failed");
                console.log(error.message);
              }
        }
        this._initEngine = async () => {
            this._engine = await RtcEngine.createWithContext(new RtcEngineContext(config.appId));
            this._addListeners();
            await this._engine.enableVideo();
            await this._engine.startPreview();
            await this._engine.setChannelProfile(ChannelProfile.LiveBroadcasting);
            await this._engine.setClientRole(ClientRole.Broadcaster);
        };
        this._addListeners = () => {
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
        this._joinChannel = async () => {
            var _a;
            if (Platform.OS === 'android') {
                await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                ]);
            }
            await ((_a = this._engine) === null || _a === void 0 ? void 0 : _a.joinChannel(config.token, this.state.channelId, null, config.uid));
        };
        this._leaveChannel = async () => {
            var _a;
            await ((_a = this._engine) === null || _a === void 0 ? void 0 : _a.leaveChannel());
        };
        this._switchCamera = () => {
            var _a;
            const { switchCamera } = this.state;
            (_a = this._engine) === null || _a === void 0 ? void 0 : _a.switchCamera().then(() => {
                this.setState({ switchCamera: !switchCamera });
            }).catch((err) => {
                console.warn('switchCamera', err);
            });
        };
        this._switchRender = () => {
            const { switchRender, remoteUid } = this.state;
            this.setState({
                switchRender: !switchRender,
                remoteUid: remoteUid.reverse(),
            });
        };
        this._switchRenderView = (value) => {
            this.setState({
                isRenderTextureView: value,
            });
        };
        this._renderVideo = () => {
            const { remoteUid } = this.state;
            return (<View style={styles.container}>
        
        <RtcLocalView.SurfaceView style={styles.local}/>
        
        {remoteUid !== undefined && (<View style={styles.remoteContainer}>
            {remoteUid.map((value, index) => (<TouchableOpacity key={index} style={styles.remote} onPress={this._switchRender}>
                  <RtcRemoteView.TextureView style={styles.container} uid={value}/>
              </TouchableOpacity>))}
          </View>)}
      </View>);
        };
        this.state = {
            channelId: "3308",
            isJoined: false,
            remoteUid: [],
            switchCamera: true,
            switchRender: true,
            isRenderTextureView: false,
            started: true
        };
    }
    UNSAFE_componentWillMount() {
        this._initEngine();
        this._joinChannel();
    }
    componentWillUnmount() {
        var _a;
        (_a = this._engine) === null || _a === void 0 ? void 0 : _a.destroy();
        console.log("################")
        clearInterval(this.interval);
        this.setState({ started: false });
    }

    componentDidMount() {
        this.interval = setInterval(()=>{console.log("hi")}, 5000);
      }
    render() {
        const { channelId, isJoined, switchCamera } = this.state;
        return (<View style={styles.container}>
        {this._renderVideo()}
        {/* <View style={styles.float}>
          <Button onPress={()=>this.props.navigation.navigate('Login')} title={`Camera`}/>
        </View> */}
        <View style={styles.float}>
            <TouchableOpacity onPress={()=>this.endfun()}>
                <Image
                style={styles.floatbtn}
                source={require('../Assests/Images/end.png')}
                />
            </TouchableOpacity>
        </View>
      </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    float: {
        position: 'absolute',
        bottom: 60,
        height:80,
        width:80,
        alignSelf:'center'
    },
    floatbtn: {
        height:"90%",
        width:"90%",
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
