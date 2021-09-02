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
import moment from "moment";
import { registerUser } from './../_actions/user_actions'
import { useDispatch } from "react-redux";
import axios from 'axios';
import { Config } from './../Config/index.js';


function RegisterPage({ navigation }) {
    const dispatch = useDispatch();

    const [TextPW, setTextPW] = useState("")
    const [TextID, setTextID] = useState("")
    const [TextName, setTextName] = useState("")
    const [TextPWCheck, setTextPWCheck] = useState("")
    const [IdFlag, setIdFlag] = useState(false)
    const [ButtonAvailable, setButtonAvailable] = useState(true)

    const variables = {
        'email': TextID
    }
    const checkID = () => {
        if(TextID === ''){
            Alert.alert('아이디를 입력해주세요')
            return
        }
        axios.post(`${Config.USER_API}/register/duplicate`, variables)
        .then(response => {
            if(!response.data.success){
                Alert.alert('서버 오류. 잠시 뒤에 다시 시도해주세요')
            }
            if(response.data.duplicate){
                Alert.alert('이미 존재하는 아이디입니다')
            }
            else{
                Alert.alert('사용 가능한 아이디입니다')
                setIdFlag(true)
                setButtonAvailable(false)
            }
        })
    }

    const register = () => {
        if(!IdFlag){
            Alert.alert('아이디 중복확인을 해주세요')
            return
        }
        if(TextPW !== TextPWCheck){
            Alert.alert('비밀번호가 일치하지 않습니다')
        }
        else{
            setTimeout(() => {
                let dataToSubmit = {
                    name: TextName,
                    email: TextID,
                    password: TextPW,
                    image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
                };
                //let data = JSON.stringify(dataToSubmit)
                dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        Alert.alert('회원가입 성공!')
                        navigation.navigate('LoginPage')
                    } else {
                        console.log(response.payload)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }, 500);
        }
        
    }

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>이름               </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTextName}
                    value={TextName}
                    placeholder="이름을 입력해주세요"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </SafeAreaView>
            <Text></Text>
            <SafeAreaView style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>ID                  </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTextID}
                    value={TextID}
                    placeholder="이메일 형식으로 입력해주세요"
                    keyboardType="default"
                    autoCapitalize="none"
                />
            </SafeAreaView>
            <Text></Text>
            {ButtonAvailable && 
                <View style={{ height: 30, justifyContent: 'center', width: '95%', borderRadius: 8, backgroundColor: 'black' }}>
                    <View>
                        <TouchableOpacity
                            styles={styles.button}
                            activeOpacity={0.5}
                            onPress={checkID}
                        >
                            <Text style={{ color: 'white', fontSize: 15, textAlign: 'center' }}>
                                아이디 중복 확인
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            {ButtonAvailable && <Text></Text>}
            <SafeAreaView style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>비밀번호        </Text>
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
            <SafeAreaView style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>비밀번호 확인</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setTextPWCheck}
                    value={TextPWCheck}
                    placeholder="비밀번호를 다시 입력해주세요"
                    keyboardType="default"
                    autoCapitalize="none"
                    secureTextEntry={true}
                />
            </SafeAreaView>
            <Text></Text>
            <Text></Text>
            <View style={{ height: 50, justifyContent: 'center', width: '95%', borderRadius: 8, backgroundColor: 'black' }}>
                <View>
                    <TouchableOpacity
                        styles={styles.button}
                        activeOpacity={0.5}
                        onPress={register}
                    >
                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>
                            회원가입
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 20,
        width: '60%',
        marginLeft: 10,
        borderBottomWidth: 1.0
    },
    text: {
        marginLeft: 0,
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



export default RegisterPage
