import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from './Background';
import {darkGreen, green} from './Constants';
import Btn from './Btn';

const Signup = (props) => {

  const[userName, setUserName] = useState('')
  const[dataAsync, setDataAsync] = useState('')
  const[userEmail, setUserEmail] = useState('')
  const[ userPassword, setUserPassword] = useState('')

  const UserData =
    {
      name : userName,
      email : userEmail,
      password : userPassword
    }

  const saveData = async()=> {
    try {
      const jsonValue = JSON.stringify(UserData)
      await AsyncStorage.setItem('USER_DATA', jsonValue)
      console.log('========= Data saved')
      props.navigation.navigate('Login')
    } catch (error) {
      console("========> Error", error)
    }
  }

  const getData = async () =>{
    try {
     const value = await AsyncStorage.getItem('USER_DATA')
     const jsonValue = JSON.parse(value)
     setDataAsync(jsonValue)
     console.log('========> here is your data', jsonValue)
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
            marginTop: 5,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 400,
            borderTopLeftRadius: 200,
            paddingTop: 90,
            alignItems: 'center',
          }}>
        
          <TextInput style={{ borderRadius: 100, color:darkGreen, paddingHorizontal: 10, width: '80%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 5 }}
            placeholderTextColor={darkGreen}
            value={userName}
            onChangeText={setUserName}
            placeholder='UserName'
          />
          <TextInput style={{ borderRadius: 100, color:darkGreen, paddingHorizontal: 10, width: '80%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 5 }}
            placeholderTextColor={darkGreen}
            value={userEmail}
            onChangeText={setUserEmail}
            placeholder='Email'
            keyboardType={'email-address'}
          />
          <TextInput style={{ borderRadius: 100, color:darkGreen, paddingHorizontal: 10, width: '80%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 5 }}
            placeholderTextColor={darkGreen}
            value={userPassword}
            onChangeText={setUserPassword}
            placeholder='Password'
            secureTextEntry={true}
          />
          <TextInput style={{ borderRadius: 100, color:darkGreen, paddingHorizontal: 10, width: '80%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 5 }}
            placeholderTextColor={darkGreen}
            value={userPassword}
            onChangeText={setUserName}
            placeholder='ConfirmPassword'
            secureTextEntry={true}
          />


          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent :"center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              and {" "}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Privacy Policy
            </Text>
          </View>

          <View
          style={{
            paddingTop: 5,
            width: 300,
            paddingVertical: 5,
            marginVertical: 10,
            }}>
          <Button
          title='Sign up'
          onPress={()=> saveData()}
          color={darkGreen}
          />
         </View>

        <View 
          style={{
            paddingTop: 5,
            width: 300,
            paddingVertical: 5,
            marginVertical: 10,
          }}>
          <Button
          title='Get Data'
          onPress={()=> getData()}
          color= {green}
          />
          </View>


        <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}> Here is Your Name: {dataAsync.name}</Text>
        <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>Here is Your Email: {dataAsync.email}</Text>
        <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>Here is Your Password: {dataAsync.password}</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: darkGreen}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: 'red', fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default Signup;