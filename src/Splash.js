import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

const Splash = ({navigation}) => {
    

    useEffect(()=>{
        setTimeout(() => {
            checkUser()
        }, 3000);
    },[])

    const checkUser = async () =>{
        try {
         const value = await AsyncStorage.getItem('IS_LOGIN')
         if (value == 'true'){ 
          navigation.navigate('Root')
         } else{
          navigation.navigate('Login')
         }
         console.log('========> here is your data', value)
        } catch (error) {
          console("========> Error", error)
        }
      } 

    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green'}}>
            <Text style={{ color: 'white', fontSize: 64 }}>Splash Sreen</Text>
        </View>
    )
}

export default Splash