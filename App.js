// import 'react-native-gesture-handler';
// // import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, 
  Text, 
  View, 
  Image, 
  SafeAreaView, 
  Dimensions, 
  Button
 } from 'react-native';
import { useDimensions, useDeviceOrientation } from '@react-native-community/hooks';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import React, {useEffect, useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ImageInput from './app/components/ImageInput'

export default function App() {
  console.log("App Executed")

  const [imageUri, setImageUri] = useState();

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("You need to enable permissions to access the camera roll");
  };

  useEffect(() => {
    requestPermission()
  });

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) 
        setImageUri(result.uri);
        console.log("Image Selected")
    } catch (error) {
      console.log('Error reading an image', error)
    }
  }
  
  return (
   <SafeAreaView> 
       <Button title="Select Image" onPress={selectImage} />
       {/* <Image source={{ uri: imageUri }} style={{ width: 200, height: 200}}/> */}
       <ImageInput imageUri={imageUri}/>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
