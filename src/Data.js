import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Data = () => {
 
  const [selectImage, setselectImage] = useState('');
  /*let options = {
    storageOptions : {
      saveToPhotos: true,
      mediaType: 'photo',
    }
  };*/
  const ImagePicker = () =>{
    let options = {
      storageOption: {
        path: 'image',
      },
    };
    launchImageLibrary(options, response => {
      setselectImage(response.assets[0].uri);
      console.log[response.assets[0].uri]
    })
  }
 

  /*const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setGalleryPhoto(result.assets[0].uri);
  };*/

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      {/* <Image style={styles.imageStyle} source={{uri: cameraPhoto}} /> */}

      <TouchableOpacity onPress={() =>{ImagePicker()}} style={styles.button}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>
      <Image
      style = {{height: 300, width:'100%'}}
      source={{uri: selectImage}} 
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#233f49',
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ebebeb',
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
  },
});

export default Data;