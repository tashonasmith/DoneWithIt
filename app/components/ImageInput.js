import React, { useEffect } from 'react';
import { View, 
    StyleSheet, 
    Image, 
    TouchableWithoutFeedback, 
    Alert } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import colors from '../config/colors';
import * as ImagePicker from 'expo-image-picker'
import { useLinkProps } from '@react-navigation/native';


function ImageInput({ imageUri, onChangeImage }) {
    useEffect(() => {
      requestPermission();
    }, [])

    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (!granted) alert("You need to enable permissions to access the camera roll");
    };
    

    const selectImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0.5
          });
          if (!result.cancelled) 
            onChangeImage(result.uri);
            console.log("Image Uri: ", result.uri)
        } catch (error) {
          console.log('Error reading an image', error)
        }
    }

    const handlePress = () => {
        if (!imageUri) selectImage()
        else Alert.alert('Delete', 'Are you sure you want to delete this image?', 
        [{ text: 'Yes', onPress: () => onChangeImage(null) },
        { text: 'No' }])
    }
    
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.container}>
            {!imageUri && (
            <MaterialCommunityIcons name="camera" size={40} color={colors.medium} />
            )}
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image}/>}
        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.light,
        borderRadius: 15,
        height: 100,
        justifyContent: "center",
        overflow: "hidden",
        width: 100
    },
    image: {
        height: "100%",
        width: "100%",
        borderRadius: 15
    }
})

export default ImageInput;