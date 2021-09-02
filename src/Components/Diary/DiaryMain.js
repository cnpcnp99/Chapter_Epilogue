import axios from 'axios';
import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Button,
  Text,
  useColorScheme,
  TouchableOpacity,
  TextInput,
  View,
  Alert
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';



const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}



function DiaryMain() {
  const navigation = useNavigation(); 
  const user = useSelector(state => state.user)
  //console.log(user)
  const [Title, setTitle] = useState('')
  const [DiaryText, setDiaryText] = useState('')
  const [Attachments, setAttachments] = useState([])

  const submitHandler = () => {
    let variables = {
      'writer': user.loginSuccess.userId,
      'title': Title,
      'description': DiaryText,
      'attachments': Attachments
    }
    //console.log(variables)
    axios.post(`http://localhost:3000/api/descriptions/submit`, variables)
    .then(res => {
      if(!res.data.success){
        Alert.alert('서버 문제로 저장에 실패했습니다.')
      }
      Alert.alert('저장 성공!')
      return navigation.reset({
        index: 0,
        routes: [{ name: 'AfterLogin' }],
      })
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView>
        <Text></Text>
        <Text></Text>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            borderWidth: 1
          }}>
          <UselessTextInput
            multiline
            numberOfLines={10}
            onChangeText={setDiaryText}
            value={DiaryText}
            style={{ padding: 10, width: 300, height: 600 }}
          />
        </View>
        <Text></Text>
        <Text></Text>
        <View style={{ height: 50, justifyContent: 'center', width: '100%', borderRadius: 8, backgroundColor: 'black' }}>
          <View>
            <TouchableOpacity
              styles={styles.button}
              activeOpacity={0.5}
              onPress={submitHandler}
            >
              <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
                저장
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>


    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: '80%',
    marginLeft: 10,
    borderBottomWidth: 1.0
  },
  text: {
    marginLeft: 20,
    textAlign: 'left',
    fontSize: 20,
    textAlignVertical: 'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },

});


export default DiaryMain
