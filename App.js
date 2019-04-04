import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Router from './src/config/routes'
import store from './src/redux/store';
import { bootstrap } from './src/config/bootstrap';
import { RkStyleSheet, RkTheme } from 'react-native-ui-kitten';


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
        }
       bootstrap();
         
     console.ignoredYellowBox = [
        'Setting a timer'
    ];
    
}


    render() {

        

        if (!this.state.isReady) {
            
            //TODO: set timer
            this.setState({isReady: true});
        }
        
        return (
            <Provider store={store}>
                    <Router/>
            </Provider>
        );
    }
}