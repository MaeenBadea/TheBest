import React, { Component } from 'react';
import { View, Text } from 'react-native';


import {
  RkStyleSheet,
  RkButton,
  RkText
} from 'react-native-ui-kitten';


class FooterNavButtons extends Component {

  _pressNavButton() {
    
    this.props.onNavPress();
  }


  _renderFooter() {

 
        return (
        <View>
          <View style={styles.textRow}>
          <RkButton
              rkType='clear'
              onPress={ () => { this._pressNavButton() } }
              >
              <RkText rkType='header6'>
                {"Don't have an account?Sign up now." }
              </RkText>
            </RkButton>
          </View>
        </View>

      );
     

  }

  

  render() {

    return (
      <View>
        { this._renderFooter() }
      </View>
    );

  }


}



let styles = RkStyleSheet.create(theme => ({
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20
  }
}));

export default FooterNavButtons;
