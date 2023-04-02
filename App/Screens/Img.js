//React Native FlatList
//https://aboutreact.com/react-native-flatlist/
 
//import React in our code
import React, {useEffect,useState} from 'react';
 
//import all the components we are going to use
import {
    FlatList,
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet
} from 'react-native';
 

const Img = () => {
  const [listItems, setListItems] = useState();
  const getImages = async () => {
    try {
      const response = await fetch(
        'http://172.26.80.1/ProjectApi/api/file/get_file'
      );
      const json = await response.json();
      setListItems(json);
      console.log("img---->"+JSON.stringify(listItems.imgpath))
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getImages();
  }, []);
 
 
  const ItemView = ({item}) => {
    return (
      // FlatList Item
      <View>
      <Image style={{ width:100,height:100}} source={{uri:global.imgUrl+item.imgpath}}/>
      </View>
    );
  };
 
  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
          style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8'
          }}
      />
    );
  };
 

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          data={listItems}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
 
export default Img;
