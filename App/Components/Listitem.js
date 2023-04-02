import { View, Text,TouchableOpacity ,StyleSheet} from 'react-native'
import React,{useState} from 'react'

const Listitem = ({item, selected, onPress, onLongPress}) => {

    
  return (
    <>
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.listItem}>
      <View style={{padding: 8}}>
        <Text style={{fontSize: 22, color: '#fff'}}>{item.cpname}</Text>
        <Text style={{color: '#989BA1'}}>{item.contact}</Text>
      </View>
      {selected && <View style={styles.overlay} />}
    </TouchableOpacity>
  </>
  )
}
const styles = StyleSheet.create({
    container: {},
    listItem: {
      backgroundColor: 'black',
      marginBottom: 10,
      borderRadius: 5,
      overflow: 'hidden',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'grey',
    },
  });
export default Listitem