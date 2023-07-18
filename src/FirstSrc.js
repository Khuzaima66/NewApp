import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';




const FirstSrc = () => {
 
  
  return (
    <View style={{flex: 1, position: "absolute"}}>
      <View style={{width: '100%', padding: 20}}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyBEx0sG_03PJRAaZDAv8KXPtjg7irH4FGQ',
        language: 'en',
      }}
    />
    </View>
      
    <View style={{ marginHorizontal: 30, marginVertical: 30, }}>
    <Text style={{ color: 'green', fontSize: 50 }}>Google </Text>
    <Text style={{ color: 'darkgreen', fontSize: 50, marginBottom: 20 }}>Map</Text>
    <Text style={{ color: 'darkgreen', fontSize: 50, marginBottom: 20 }}>Map 2</Text>

    <Icon name= 'google' size={30}/>
    </View>

    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 28.412217531431452,  
         longitude: 70.3309845117444,
         latitudeDelta: 0.0100,
         longitudeDelta: 0.0080,
       }}
     >
     </MapView>
   </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default FirstSrc;