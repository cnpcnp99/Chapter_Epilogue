import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from './LoginPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
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
    View,
  } from 'react-native';

function HomeScreen({navigation}) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>홈 스크린입니다.</Text>
          <Button
            title="Login 페이지로 이동"
            onPress={() =>
              navigation.navigate('LoginPage', {
                itemId: 77,
                otherParam: 'this is param',
              })
            }
          />
          <Button
            title="Carousel 테스트"
            onPress={() =>
              navigation.navigate('CarouselPage')
            }
          />
          
        </View>
      );
}

export default HomeScreen
