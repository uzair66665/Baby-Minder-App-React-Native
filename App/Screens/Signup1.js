import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';



export default function Signup1({navigation}){
  const [pickerValue, setPickerValue] = useState('');
  const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    
     const SignupUser=  async() => {
      try {
        if(password==confirmPassword)
        {
          await  fetch("http://192.168.10.8/ProjectApi/api/login/Add_User", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Email:email,
              Pass:password,
              usertype:pickerValue,
            })
            }).then(response => response.json())
            .then(data => {
              // if (data =="ok") {
              //   // navigation.navigate('ParentHome')
              //   alert("User Added")
              // }
              // else alert(data)
              if(data=="Sorry")
              {
                alert("Email Already Exists")
              }
              else if(typeof data=='number')
              {
                if (pickerValue=="careperson") {
                  navigation.navigate('ParentHome')
                }
                else if(pickerValue=="child"){
                  navigation.navigate('ChildHome')
                }
              }
              else 
                alert(data)
            });
        }
        else
          alert("Confirm Password Not match")
        
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
  return(
    <View >
      <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
          

            <TextInput style={styles.inputStyle}
                placeholder='Enter Email'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(email)=>setEmail(email)}
            />

            <TextInput style={styles.inputStyle}
                placeholder='Enter Password'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(password)=>setPassword(password)}
                secureTextEntry={true}
                
            />
            <TextInput style={styles.inputStyle}
                placeholder='Confirm Password'
                autoCapitalize='none'
                placeholderTextColor={'#000'}
                onChangeText={(confirmPassword)=>setConfirmPassword(confirmPassword)}
                secureTextEntry={true}
            />

          <View style={styles.container}>
              <Picker style={styles.picker}  
              
              selectedValue={pickerValue}
              onValueChange={(itemValue)=>setPickerValue(itemValue)}
              >
                    <Picker.Item label='Select Role' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Care Person' value={'careperson'}></Picker.Item> 
                    <Picker.Item label='Child' value={'child'}></Picker.Item> 
              </Picker>
          </View>

            <TouchableOpacity onPress={()=>SignupUser()}>
                <Text
                style={styles.btn1}>
                    Signup
                </Text>
            </TouchableOpacity>

            
      </ImageBackground>
    </View>
  );
}

const styles=StyleSheet.create({
  
  bg:{
    width:'100%',
    height:'100%',
    alignItems:'center',
  },
  img1:{
    width:"45%",
    height:"30%",
    marginTop:"10%",
  },
  btn1:{
            fontSize:30,
            color:"black",
            width:150,
            backgroundColor:'#75c8ff',
            marginTop:50,
            borderRadius: 30,
            textAlign:'center',
            justifyContent:'center'
  },
  inputStyle: {
            width:'60%',
            backgroundColor:'white',
            color:'#000',
            placeholderTextColor:'black',
            marginTop:'10%',
            paddingLeft:25,
            borderRadius: 30,
  },
  container:{
    marginTop:'10%',
   justifyContent:'center',
   alignItems:'center',
  },
  picker:{
    width:230,
    color:'black',
    borderColor:'blue',
    borderWidth:1,
    backgroundColor:'white',
    borderBottomLeftRadius:30,
    borderRadius: 30,
  },
})





// import { View, Text,TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity,Button} from 'react-native'
// import React from 'react'
// import { Dropdown } from 'react-native-material-dropdown-v2-fixed';



// export default function Signup1({navigation}){
//   let data = [{
//     value: 'Care Person',
//   }, {
//     value: 'Child',
//   }];
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const [confirmPassword,setConfirmPassword]=useState("");
    
//      const SignupUser=  async() => {
//       try {
//       await  fetch("http://192.168.10.16/Project1/api/login/User_Login", {
//               method: 'POST',
//               headers: {
//               Accept: 'application/json',
//               'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({
//                 Email:email,
//                 Pass:password,
//               })
//               }).then(response => response.json())
//               .then(data => {
//                 if (data =="Login") {
//                   navigation.navigate('ParentHome')
//                 }
//                 else alert("Incorrect username or password")
//               });
          
//       }
//       catch (error) {
//         console.log("Post submission failed");
//         console.log(error.message);
//       }
//     }
//   return (
//     <View >
//       <ImageBackground source={require('../Assests/Images/bg.png')} style={styles.bg} >
//           <Image
//           style={styles.img1}
//           source={require('../Assests/Images/logo1.png')}
//           />

//             <TextInput style={styles.inputStyle}
//                 placeholder='Enter Email'
//                 autoCapitalize='none'
//                 onChangeText={(email)=>setEmail(email)}
//             />

//             <TextInput style={styles.inputStyle}
//                 placeholder='Enter Password'
//                 autoCapitalize='none'
//                 onChangeText={(password)=>setPassword(password)}
//             />
//             <TextInput style={styles.inputStyle}
//                 placeholder='Confirm Password'
//                 autoCapitalize='none'
//                 onChangeText={(confirmPassword)=>setConfirmPassword(confirmPassword)}
//             />
//             <Dropdown style={styles.picker}
//                     icon='short-down'
//                     iconColor='#E1E1E1'
//                     label='Select One'
//                     data={data}
//             />   

//             <TouchableOpacity onPress={() => SignupUser()}>
//                 <Text
//                 style={styles.btn1}>
//                     Login
//                 </Text>
//             </TouchableOpacity>

            
//       </ImageBackground>
//     </View>
          
//   );
// }

// const styles=StyleSheet.create({
  
//   bg:{
//     width:'100%',
//     height:'100%',
//     alignItems:'center',
//   },
//   img1:{
//     width:"45%",
//     height:"30%",
//     marginTop:'6%',
//   },
//   btn1:{
//             fontSize:30,
//             color:"black",
//             width:150,
//             backgroundColor:'#75c8ff',
//             borderRadius: 30,
//             textAlign:'center',
//             justifyContent:'center',
//             marginTop:'6%',
//   },
//   inputStyle: {
//             color:"black",
//             width:'60%',
//             backgroundColor:'#75c8ff',
//             paddingLeft:25,
//             borderRadius: 30,
//             marginTop:'6%',
//   },
//   picker:{
//     width:230,
//     borderColor:'blue',
//     backgroundColor:'#75c8ff',
//     borderRadius: 30,
//     marginTop:'6%',
//     borderTopRightRadius:30,
//     borderTopLeftRadius:30,
//   },
// })



