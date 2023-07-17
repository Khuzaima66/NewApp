import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity,  } from 'react-native';
import Btn from './Btn';
import Background from './Background';
import { green, darkGreen } from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


function Home(props) {
  const removeUser = async () =>{
    try {
      await AsyncStorage.removeItem('IS_LOGIN')
      console.log('User Removed')
      props.navigation.navigate('Login')
    } catch (error) {
      console.log('Error', error)
    }
  }
  return (
    <View>
    <View style={{ marginHorizontal: 35, marginVertical: 100, }}>
    <Text style={{ color: 'red', fontSize: 54, fontFamily: 'Poppins-Bold', fontWeight: '600' }}>Welcome</Text>
    <Text style={{ color: 'green', fontSize: 64 }}>Let's start</Text>
    <Text style={{ color: 'green', fontSize: 64, marginBottom: 40 }}>Coding</Text>
    <TouchableOpacity onPress={removeUser}>
      <Text style={{color: "red"}}>Logout</Text>
    </TouchableOpacity>
    {/* <Btn bgColor='white' textColor= {darkGreen} btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
    <Btn bgColor='green' textColor='white' btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} /> */}
    </View>
    
    </View>
    
  );
}

const styles = StyleSheet.create({

});

export default Home;