import React, { useState } from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen, green} from './Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = ({navigation}) => {
   const[userName, setUserName] = useState('')
   const[userPass, setPass] = useState('')
   

/*  const checkUser = () =>{
   auth()
  .createUserWithEmailAndPassword(userName, userPass)
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  }); 
};   */

/*  const createDocument = async () => {
    try {
      await firestore()
        .collection('Users')
        .doc('BjDWQEhsJVJzKzJ3kloH')
        .set({
          name: 'John Doe',
        });
      console.log('Document created successfully!');
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };   */




 const checkUser = async () =>{
    try {
     const value = await AsyncStorage.getItem('USER_DATA')
     const storedData = JSON.parse(value)
     if (storedData.email == userName && storedData.password == userPass){
      await AsyncStorage.setItem('IS_LOGIN', 'true')
      navigation.navigate('Root')
     } else{
      Alert.alert('Wrong creds')
     }
     console.log('========> here is your data', storedData)
    } catch (error) {
      console("========> Error", error)
    }
  }

  return (
    <Background>
      <View style={{alignItems: 'center', width: 350}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 25,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 400,
            borderTopLeftRadius: 200,
            paddingTop: 70,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
         <TextInput style={{ borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '80%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10 }}
            placeholderTextColor={darkGreen}
            value={userName}
            onChangeText={setUserName}
            placeholder='Email'
          />

          <TextInput style={{ borderRadius: 100, color: darkGreen, paddingHorizontal: 10, width: '80%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10 }}
            placeholderTextColor={darkGreen}
            value={userPass}
            onChangeText={setPass}
            placeholder='Password'
            secureTextEntry={true}
          />

          <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 10, marginBottom: 15}}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
          </View>
          <TouchableOpacity
          style={{
            width: '80%',
            height: 50,
            borderRadius: 100,
            backgroundColor: green,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={()=> checkUser()}
          >
            <Text style={{color: 'red', fontFamily: 'Poppins-Bold'}}>Create User</Text>
          </TouchableOpacity>


        {/* <TouchableOpacity
          style={{
            width: '80%',
            height: 50,
            borderRadius: 100,
            backgroundColor: green,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={()=> createDocument()}
          >
            <Text style={{color: 'red', fontFamily: 'Poppins-Bold'}}>Create Document</Text>
          </TouchableOpacity>  */}


          {/* <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={checkUser()} /> */}

          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight:"bold", color: green}}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  ); 
};

export default Login;