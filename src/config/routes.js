import React from 'react';

import NavigatorService from '../utils/navigator';
import { RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import {  createStackNavigator  } from 'react-navigation';
import {View , Platform , StatusBar } from 'react-native';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import Login from '../modules/auth/scenes/Login';
import Home from '../modules/home/scenes/Home';
import MatchesScreen from '../modules/matches/scenes/MatchesScreen'

import Test from './test';

//Import Store, actions
import store from '../redux/store'

export default class extends React.Component {
    constructor() {
        super();
     
    }

    componentDidMount() {
        let _this = this;

        if (Platform.OS === 'ios') {
            StatusBarIOS.setHidden(true)
          }

    }

  
    render() {
        const LoginNavigator = createStackNavigator({
            welcome_screen: { screen: Welcome },
            register_screen: { screen: Register },
            login_screen: { screen: Login},
            home_screen: { screen: Home}, 
            matches_screen: {screen: MatchesScreen}
            },
            {
                navigationOptions: {
                tabBarVisible: false
                },
                swipeEnabled: false,
                lazy: true ,
                headerMode: 'none',
            });            
            

        return (
            <View style={styles.container}>
            <MyStatusBar backgroundColor="#26a0da" barStyle="light-content" />
               <LoginNavigator
                 ref={navigatorRef => {
                 NavigatorService.setContainer(navigatorRef);
                }}/>
           </View>
        );
    }
}
const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
  

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = RkStyleSheet.create(theme => ({
    container: {
      flex: 1,


    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
      },
  
  }));
  