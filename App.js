// Import React
import React, {useState} from 'react';
import { Buffer } from 'buffer';
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import RNQRGenerator from 'rn-qr-generator';
import RNFetchBlob from 'rn-fetch-blob'
// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from "react-native-image-picker"
import QrCodeReader from "qrcode-reader";
const App = () => {
  const [filePath, setFilePath] = useState({});

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response['assets'][0]['uri']);
      RNQRGenerator.detect({
        uri: response['assets'][0]['uri'] ,
      })
        .then(response1 => {
          const { values } = response1;
          console.log("QR:",response1);
          alert("QR:",response1);
        })
        .catch(error => console.log('Cannot detect QR code in image', error));

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        let source = response;
        setFilePath(source);
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={styles.titleText}>
        Example of Image Picker in React Native
      </Text>
      <View style={styles.container}>
        {/*<Image 
          source={{ uri: filePath.path}} 
          style={{width: 100, height: 100}} />*/}
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        />
        <Image
          source={{uri: filePath.uri}}
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>
          {filePath.uri}
        </Text>
        {/*
          <Button
            title="Choose File"
            onPress={chooseFile} />
        */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={chooseFile}>
          <Text style={styles.textStyle}>
            Choose Image
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});