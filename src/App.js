import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import { ApplicationNavigator } from '@/Navigators'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Components/HomeScreen'
import LoginPage from './Components/LoginPage.js'
import RegisterPage from './Components/RegisterPage.js'
import CarouselPage from './Components/CarouselPage.js'
import AfterLogin from './Components/AfterLogin'
import DiaryMain from './Components/Diary/DiaryMain'
import './Translations'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers'
import Auth from './hoc/auth'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
const Stack = createStackNavigator();
const App = () => (
  <Provider
    store={createStoreWithMiddleware(Reducer, 
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
  >
    {/**
     * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
     * and saved to redux.
     * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
     * for example `loading={<SplashScreen />}`.
     * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
     */}
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            exact path="/"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen exact path="/login"name="LoginPage" component={Auth(LoginPage, false)} />
          <Stack.Screen exact path="/register" name="RegisterPage" component={Auth(RegisterPage, false)} />
          <Stack.Screen exact path="/carousel" name="CarouselPage" component={Auth(CarouselPage, null)} />
          <Stack.Screen exact path="/afterlogin" name="AfterLogin" component={Auth(AfterLogin, true)} />
          <Stack.Screen exact path="/diarymain" name="DiaryMain" component={Auth(DiaryMain, true)} />
          

        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  </Provider>
)

export default App
