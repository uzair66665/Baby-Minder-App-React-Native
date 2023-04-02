import React ,{useState,useRef,useEffect} from 'react';
import {View,Text,Button,StyleSheet,ImageBackground,Image,TextInput,SafeAreaView,TouchableOpacity,Alert,KeyboardAvoidingView,ScrollView} 
from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker'; 
//Import React Native Video to play video
import Video from 'react-native-video';
 
//Media Controls to control Play/Pause/Seek and full screen
import
  MediaControls, {PLAYER_STATES}
from 'react-native-media-controls';






const AddLullaby=({navigation})=>
{
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
  /////////////////////////////////////////////////////////
const [filePath, setFilePath] = useState();
let imageName;
let vid;

const chooseFile = (type) => {
  let options = {
    mediaType: type,
    maxWidth: 1200,
    maxHeight: 2200,
    quality: 1,
  };
  launchImageLibrary(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      alert('User cancelled camera picker');
      return;
    } else if (response.errorCode == 'camera_unavailable') {
      alert('Camera not available on device');
      return;
    } else if (response.errorCode == 'permission') {
      alert('Permission not satisfied');
      return;
    } else if (response.errorCode == 'others') {
      alert(response.errorMessage);
      return;
    }
    console.log('base64 -> ', response.assets[0].base64);
    console.log('uri -> ', response.uri);
    console.log('width -> ', response.width);
    console.log('height -> ', response.height);
    console.log('fileSize -> ', response.fileSize);
    console.log('type -> ', response.type);
    console.log('fileName -> ', response.assets[0].fileName);
    setFilePath(response.assets[0]);
    console.log("Path..........",response.assets[0]);
  });
};
const Add=  async() => {
  try {
      await  fetch(global.ip+"File/Add_File", {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cpid:global.pid,
          vid:vid,
        })
        }).then(response => response.json())
        .then(data => {
          console.log(data)
        });
    
      
  }
  catch (error) {
    console.log("Post submission failed");
    console.log(error.message);
  }
}
const AddVideo = async () => {
  try {
    console.log("video posting")
    const data = new FormData();
    data.append("video", {
      name: 'abc.mp4',
      type: 'video/mp4',
      uri:
        Platform.OS === "android" ? filePath.uri : filePath.uri.replace("file://", "")
    });
    console.log("video posting 1")
    await fetch(global.ip+'File/UploadFile',
      {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data;',
        }
      }
    ).then(response => response.json())
      .then(data => {
        console.log("Printing filename...");
        console.log(data.Name);
        console.log("Calling  ...");
        imageName=data.Name
        fetch(global.ip+"File/Add_Video", {
          method: 'POST',
          body: JSON.stringify({
            vname:imageName,
            cpid:global.pid,
          }
          ),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(response => response.json())
          .then(data => {
            if (data != '') {
              vid=data;
              Add();
              alert("Video Added Successfully")
              navigation.navigate('LullabySettings')
            }
            else alert("Plz Try Again!")
          });
      });
  }
  catch (error) {
    console.log("Post submission failed");
    console.log(error.message);
  }
}

    return(
        <View style ={styles.body}>
          <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
          <View style={{width: '100%', height: '8%',justifyContent: 'center', backgroundColor: '#00a2ed'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
          }}>
          ADD LULLABY
        </Text>
          </View>
            <View  style ={styles.view}>
            

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
                      source={{uri:filePath.uri}}
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
            
            
              <View style={styles.btnview}>
                <TouchableOpacity onPress={()=>chooseFile('image')}>
                      <Text
                      style={styles.btn1}>
                          Select Video
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>AddVideo()}>
                      <Text
                      style={styles.btn1}>
                          Upload Video
                      </Text>
                  </TouchableOpacity>
              </View>
          </ImageBackground>
         </View>

        )
    };
    export default AddLullaby;
    const styles = StyleSheet.create({
        body: {
            flex:1,
           backgroundColor:'#DCDCDC',
          },
          bg:{
            width:'100%',
            height:'100%',
          },
          view:{
              height:'70%',
              justifyContent:'center',
              alignItems:'center',
              borderWidth:1,

          },
          btnview:{
            
            justifyContent:'center',
            alignItems:'center',

        },
         
           image:{
             width:300,
             height:600,
          },
          image001:{
            width:300,
             height:600,
         },
         
         
         btn1:{
          fontSize:30,
          color:"black",
          width:250,
          backgroundColor:'#00a2ed',
          marginTop:20,
          borderRadius: 30,
          textAlign:'center',
          justifyContent:'center'
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
    });
