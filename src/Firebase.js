import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import Background from './Background';
import { darkGreen, green } from './Constants';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import OneSignal from 'react-native-onesignal';
import Icon from 'react-native-vector-icons/Entypo';


const Login = ({ }) => {
  const [userName, setUserName] = useState('')
  const [userPass, setPass] = useState('')
  const [myData, setMyData] = useState('')
  const [push, setpush] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [messageData, setMessageData] = useState([])
  

  useEffect(() => {
    getDocument();
    getNotifications()
  }, []);

  const getNotifications = () => {
    // OneSignal Initialization
    OneSignal.setAppId('f8627859-280e-42b9-ac0f-f89556afe6b5');

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      setpush(true)
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData
      console.log("additionalData: ", data);
      setMessageData(notification)
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });
  }

  const checkUser = () => {
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
  };

  const getDocument = async () => {
    try {
      const data = await firestore()
        .collection('Users')
        .doc('JjhOyRB7yjgjtAClektG')
        .get()
      setMyData(data._data);
      console.log(data._data);
    } catch (err) {
      console.log(err);
    }
  };


  const createDoc = async () => {
    try {
      await firestore()
        .collection('app')
        .doc('TasDIGVQqFgEz9lmuva9')
        .set({
          name: 'Khuzaima',
          age: 25,
        });
      console.log('Document created successfully!');
    } catch (error) {
      console.error('Error creating document:', error);
    }
  };


  const readDocument = async () => {
    try {
      const documentSnapshot = await firestore()
        .collection('app')
        .doc('TasDIGVQqFgEz9lmuva9')
        .get();

      if (documentSnapshot.exists) {
        console.log('Document data:', documentSnapshot.data());
      } else {
        console.log('Document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };


  const updateDocument = async () => {
    try {
      await firestore()
        .collection('app')
        .doc('TasDIGVQqFgEz9lmuva9')
        .update({
          age: 88,
        });
      console.log('Document updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const deleteDocument = async () => {
    try {
      await firestore()
        .collection('app')
        .doc('TasDIGVQqFgEz9lmuva9')
        .delete();
      console.log('Document deleted successfully!');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };



  return (
    <Background>
      <View style={{ alignItems: 'center', width: 350 }}>

        <TouchableOpacity
          style={{
            marginLeft: 300,
            padding: 8,
          }}
          onPress={() => setpush(false)}
        >
          <Icon name='dots-three-vertical' size={30} color='white' />
          {push == true ?
            <View style={{ height: 10, width: 10, backgroundColor: 'red', borderRadius: 150, position: 'absolute', top: 5, right: 10 }}>
            </View> : null
          }
        </TouchableOpacity>

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
          <Text style={{ fontSize: 40, color: darkGreen, fontWeight: 'bold' }}>
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

          <Text style={{ fontSize: 20, color: darkGreen, fontWeight: 'bold' }}>Name:-{myData ? myData.Name : 'Loading...'}</Text>
          <Text style={{ fontSize: 20, color: darkGreen, fontWeight: 'bold' }}>Email:-{myData ? myData.Email : 'Loading...'}</Text>

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
            style={{ alignItems: 'flex-end', width: '78%', paddingRight: 20, marginBottom: 5 }}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Forgot Password ?
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: '70%',
              height: 40,
              borderRadius: 100,
              backgroundColor: green,
              marginTop: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => checkUser()}
          >
            <Text style={{ color: 'red', fontFamily: 'Poppins-Bold' }}>Create User</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={{
              width: '60%',
              height: 40,
              borderRadius: 100,
              backgroundColor: green,
              marginTop: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => createDoc()}
          >
            <Text style={{ color: 'red', fontFamily: 'Poppins-Bold' }}>Create Doc</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={{
              width: '50%',
              height: 40,
              borderRadius: 100,
              backgroundColor: green,
              marginTop: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => readDocument()}
          >
            <Text style={{ color: 'red', fontFamily: 'Poppins-Bold' }}>Read Doc</Text>
          </TouchableOpacity>


          {/* <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={checkUser()} /> */}

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: green }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => updateDocument()}>
              <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Update</Text>
            </TouchableOpacity>

          </View>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Delete</Text>
          </TouchableOpacity>
        </View>


        <Modal
          visible={showModal}
          transparent={true}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#fff', height: 200, width: 200, justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 2, borderColor: '#000' }}>
            <TouchableOpacity style={{
              position: 'absolute', top: 10, right: 10
            }}
            onPress={() => setShowModal(false)}>
              <Icon name="circle-with-cross" size={15} color={green}/>
              
            </TouchableOpacity>
              <Text style={{fontSize: 20}}>This is Modal</Text>
              <Text style={{fontSize: 20}}>{messageData.body}</Text>

            </View>
          </View>
        </Modal>
      </View>
    </Background>
  );
};

export default Login;