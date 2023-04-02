import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import DocumentPicker, { isInProgress, types, } from 'react-native-document-picker';
import { useEffect,useState } from 'react';
export default function Dpicker() {
    const [result, setResult] = useState();
    const [audioPath, setaudioPath] = useState();
    useEffect(() => {
        
        
    }, []);

    

    const handleError = (err) => {
        if (DocumentPicker.isCancel(err)) {
            console.warn('cancelled');
            // User cancelled the picker, exit any dialogs or menus and move on
        }
        else if (isInProgress(err)) {
            console.warn('multiple pickers were opened, only the last will be considered');
        }
        else {
            throw err;
        }
    };
    let audioName;
    let aid;
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
      
      const AddAudio = async () => {
        try {
            
          console.log("audio posting")
          console.log(audioPath);
          const data = new FormData();
          data.append("audio", {
            name: 'xyz.mp3',
            type: 'audio/mp3',
            uri:
              Platform.OS === "android" ? audioPath.uri : audioPath.uri.replace("file://", "")
          });
          console.log("audio posting 1")
          await fetch(global.ip+'Audio/UploadFile',
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
              audioName=data.Name
              fetch(global.ip+"Audio/Add_Video", {
                method: 'POST',
                body: JSON.stringify({
                  audioname:audioName,
                  vid:1015,
                }
                ),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }
              }).then(response => response.json())
                .then(data => {
                    console.log(data)
                //   if (data != '') {
                //     vid=data;
                //     Add();
                //     alert("Video Added Successfully")
                //     navigation.navigate('LullabySettings')
                //   }
                //   else alert("Plz Try Again!")
                });
            });
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      
      const pickaudio=async()=>{
        DocumentPicker.pick({
            type: types.audio,
        }).then(data=>{
            // console.log(data);
            // console.log(data[0].uri);
            setaudioPath(data[0])
        })
      }
    return (<View style={styles.container}>
      
      
      <Button title="open picker for single selection of pdf file" onPress={() => {
            pickaudio()
        }}/>

    <Button title="ADDDDDDD" onPress={() => AddAudio()}/>
      

      <Text selectable>Result: {JSON.stringify(result, null, 2)}</Text>
    </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 60,
        height: 60,
        marginVertical: 20,
    },
});