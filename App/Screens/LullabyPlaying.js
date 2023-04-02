// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/
 
// import React in our code
import React, {useState, useRef,useEffect} from 'react';

 
// import all the components we are going to use
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
 
//Import React Native Video to play video
import Video from 'react-native-video';
 
//Media Controls to control Play/Pause/Seek and full screen
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';
 
export default function LullabyPlaying({navigation}){
  let holdtime=3000
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');
  const [count,setCount]=useState(1);
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
 
  const onEnd = () => {
    console.log("end")
    console.log(count)
    setPlayerState(PLAYER_STATES.PLAYING);
    GetVideo()
    console.log("start")
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };
 
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
  const [filePath, setFilePath] = useState();
  const GetVideo=  async() => {
    try {
     
      console.log("getting 1")
      console.log(count)
        const response = await fetch(global.ip+"File/Get_VideoLoop?cid="+global.cid+"&pr="+count);
        const json = await response.json();
        console.log("getting 2")
        console.log(json[0])
        setFilePath(json[0]);
        console.log(filePath);
        if(json[1]=="nonext")
        {
          setCount(1);
        }
        else
          setCount(count + 1);
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  const notification= async() =>{
    try {
      await  fetch(global.ip+"Notification/setCalling", {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cid:global.cid,
        })
        }).then(response => response.json())
        .then(data => {
          console.log("Notification......",data)
        });
    
      
  }
  catch (error) {
    console.log("Post submission failed");
    console.log(error.message);
  }
  }
  const onHold=async()=>{

  }
  const [holdState,setholdState]=useState(false)
  const checkStatus= async() =>{
    try {
      const response = await fetch(global.ip+"notification/checkStatus?id="+global.cid);
        const json = await response.json();
        if(json=="accept")
        {
          global.role="child"
          navigation.navigate('ChildCall')
        }
        // else if(json=="hold")
        // {
        //   setholdState(true)
        //   console.log(holdState)
        // }
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  const update=async()=>{
    try {
      const response = await fetch(global.ip+"notification/holdStatus?id="+global.cid);
        const json = await response.json();
        console.log("Status update");
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  const checkhold= async()=>{
    const response = await fetch(global.ip+"notification/checkStatus?id="+global.cid);
        const json = await response.json();
        if(json=="hold")
        {
          update();
        }
  }
  useEffect(() => {
    //alert(global.cid)
    notification();
    GetVideo();
    const interval=setInterval(()=>{
      checkStatus();
      //console.log("3 seconds")
    },1000)
    console.log(holdState)
    const interval1=setInterval(()=>{
      checkhold();
      console.log("40 seconds")
    },40000)
    
    //chooseFile('video');
  }, [])
  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );
 
  const onSeeking = (currentTime) => setCurrentTime(currentTime);
 const [player,setPlayer]=useState([]);
  return (
    <View style={{flex: 1}}>
       {filePath!=undefined? 
                    ( <Video
                      onEnd={onEnd}
                      onLoad={onLoad}
                      onLoadStart={onLoadStart}
                      onProgress={onProgress}
                      paused={paused}
                      ref={videoPlayer}
                      resizeMode={'contain'}
                      onFullScreen={isFullScreen}
                      source={{uri:'http://192.168.132.1/ProjectApi/'+filePath}}
                      style={styles.mediaPlayer}
                      volume={10}
                    />)
                :
                (<Video
                  onEnd={onEnd}
                  onLoad={onLoad}
                  onLoadStart={onLoadStart}
                  onProgress={onProgress}
                  paused={paused}
                  ref={videoPlayer}
                  resizeMode={'contain'}
                  onFullScreen={isFullScreen}
                  source={{
                    uri:
                      'http://192.168.132.1/ProjectApi/assets/video.mp4'
                  }}
                  style={styles.mediaPlayer}
                  volume={10}
                />)
            }
      
      
    </View>
  );
};
 

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
