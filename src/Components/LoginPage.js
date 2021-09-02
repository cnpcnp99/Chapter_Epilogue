/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import RegisterPage from './RegisterPage';
import { useDispatch } from "react-redux";
import { loginUser } from './../_actions/user_actions'
import { useNavigation } from '@react-navigation/native';
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


function LoginPage() {
    const dispatch = useDispatch();
    const navigation = useNavigation(); 

    const [Param, setParam] = useState('');
    const [TextID, setTextID] = useState('')
    const [TextPW, setTextPW] = useState('')
    const [number, onChangeNumber] = React.useState(null);

    const login = () => {
        if(TextID === ''){
            Alert.alert('아이디를 입력해주세요')
            return
        }
        if(TextPW === ''){
            Alert.alert('비밀번호를 입력해주세요')
            return
        }

        let body = {
            email: TextID,
            password: TextPW
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    Alert.alert('로그인 성공!')
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'AfterLogin' }],
                      })
                }
                else{
                    if(response.payload.type === 'id'){
                        Alert.alert('존재하지 않는 아이디입니다')
                    }
                    else if(response.payload.type === 'pw'){
                        Alert.alert('비밀번호가 일치하지 않습니다', response.payload)
                    }
                }
            })

    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView >
                <SafeAreaView style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>ID  </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextID}
                        value={TextID}
                        placeholder="ID를 입력해주세요"
                        keyboardType="default"
                        autoCapitalize="none"
                    />
                </SafeAreaView>
                <Text></Text>
                <Text></Text>
                <SafeAreaView style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>PW</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setTextPW}
                        value={TextPW}
                        placeholder="비밀번호를 입력해주세요"
                        keyboardType="default"
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                </SafeAreaView>
                <Text></Text>
                <Text></Text>
                <Text></Text>
            </SafeAreaView>
            <View style={{ height: 50, justifyContent: 'center', width: '95%', borderRadius: 8, backgroundColor: 'black' }}>
                <View>
                    <TouchableOpacity
                        styles={styles.button}
                        activeOpacity={0.5}
                        onPress={login}
                    >
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
                            로그인
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text></Text>
            <View style={{ height: 50, justifyContent: 'center', width: '95%', borderRadius: 8, backgroundColor: 'black' }}>
                <View>
                    <TouchableOpacity
                        styles={styles.button}
                        activeOpacity={0.5}
                        onPress={() => navigation.navigate('RegisterPage')}
                    >
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
                            회원가입
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
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


export default LoginPage;
