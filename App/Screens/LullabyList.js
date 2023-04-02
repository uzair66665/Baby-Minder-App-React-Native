import { View, Text, StyleSheet,ImageBackground, TouchableOpacity,FlatList,Pressable} from 'react-native'
import React from 'react'
import { useState,useRef,useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
//Import React Native Video to play video
import Video from 'react-native-video';
 
//Media Controls to control Play/Pause/Seek and full screen
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';

///////////////////////////////////////
export default function LullabyList({navigation}){
    const [data,setData]=useState("");
      const [isSelected, setSelection] = useState(false);
      const [mon, setMon] = React.useState(false);
/////////////////////////////////////////////////////
const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [
    playerState, setPlayerState
  ] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');
 
  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };
 
  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPaused(!paused);
    setPlayerState(playerState);
  };
 
  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };
 
  const onProgress = (data) => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };
 
  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
 
  const onLoadStart = (data) => setIsLoading(true);
 
  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
 
  const onError = () => alert('Oh! ', error);
 
  const exitFullScreen = () => {
    alert('Exit full screen');
  };
 
  const enterFullScreen = () => {};
 
  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

/////////////////////////////////////////////////////

    const GetVideo=  async() => {
        try {
            //alert(pid);
            const response = await fetch(global.ip+"File/Get_Video?id="+global.pid);
            const json = await response.json();
            setData(json);
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      const DelVideo=  async(id) => {
        try {
            //alert(pid);
            const response1 = await fetch(global.ip+"File/Delete_VideoPriority?id="+id);
            const response = await fetch(global.ip+"File/Delete_File?id="+id);
            const json = await response.json();
            alert('Deleted')
            GetVideo()
            console.log(json)
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      useEffect(() => {
        GetVideo();
      }, [])
  return (
    
      <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
       <View style={{width: '100%', height: '8%',justifyContent: 'center', backgroundColor: '#00a2ed'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
          }}>
          LULLABY LIST
        </Text>
          </View>
       <View>
       <FlatList
          data={data}
          renderItem={({ item })=> (
            <View 
            style={styles.container} 
          >
            
            <View style={{ flex: 1 }}>
              <Text style={styles.Foodname}>{item.vname}</Text>
              <Video 
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                onProgress={onProgress}
                ref={videoPlayer}
                resizeMode={'contain'}
                onFullScreen={isFullScreen}
                source={{
                uri:
                    global.videoUri+item.vname
                }}
                style={styles.mediaPlayer}
                volume={0}
            />
            </View>
            <View>
                
            <TouchableOpacity onPress={() => DelVideo(item.vid)}>
        <Text 
        style={styles.btn1}>Delete</Text>
      </TouchableOpacity>
            </View>
            
          </View>
          )}
          
        />
        <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.navigate('LullabySettings')}>
            <Text
             style={styles.btn2}>
                Done
            </Text>
          </TouchableOpacity>
        </View>
          </View>
      </ImageBackground>
      
    
          
  );
}

const styles=StyleSheet.create({
 
  bg:{
    width:'100%',
    height:'100%',
  },
  btn:{
alignItems:'center',
  },
  btn2:{
    fontSize:30,
    color:"black",
    width:150,
    backgroundColor:'#00a2ed',
    borderRadius: 30,
    marginBottom:'10%',
    textAlign:'center',
    marginTop:"30%",
},
container: {
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    borderBottomColor: "black",
    backgroundColor:'white',
    borderBottomWidth: 1,
    flexDirection: "row",
    height:160
  },
  Foodname: {
    color:'black',
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
    marginLeft:'10%'
  },
  price: {
    color:"black",
    fontSize: 16,
    marginLeft:'10%'
  },
  btn1:{
    width:70,
    backgroundColor:'#e1ecf5',
    marginTop:50
},
mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    height:'100%'
  },
})

