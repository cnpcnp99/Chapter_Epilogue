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
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Config } from '../Config';
import { useDispatch } from "react-redux";
import { logoutUser } from './../_actions/user_actions'

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={500}
    />
  );
}



function AfterLogin() {
  const navigation = useNavigation(); 
  const dispatch = useDispatch();
  const logout = () => {
    axios.get(`${Config.USER_API}/logout`).then(res => {
      if (res.status === 200) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      } else {
        Alert.alert('Log Out Failed')
      }
    })
    
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>로그인 후 화면입니다.</Text>
      <Button
        title="로그아웃"
        onPress={() =>
          dispatch(logoutUser()).then(res => {
            if (res.status === 200) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            } else {
              Alert.alert('Log Out Failed')
            }
          })
        }
      />
      <Button
        title="일기 작성 페이지로 이동"
        onPress={() =>
          navigation.navigate('DiaryMain')
        }
      />
    </View>
  )
  
}

export default AfterLogin
