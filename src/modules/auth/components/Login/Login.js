import React, { Component } from 'react';
import { View, Keyboard,ScrollView , Dimensions, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';

import ErrorMessage from '../../../../components/ErrorMessage';
import LoginHeaderImage from './LoginHeaderImage';
import EmailTextInput from './EmailTextInput';
import PwdTextInput from './PwdTextInput';
import FirstName from './FirstnameTextInput';
import LastName from './LastnameTextInput';


import EmailPwdButton from './EmailPwdButton';
import FooterNavButtons from './FooterNavButtons';


import LoadingSpinner from '../../../../components/Loading/LoadingSpinner';



import {
  RkStyleSheet
} from 'react-native-ui-kitten';

class Login extends Component {

  constructor(props) {

    super(props)
    this.state = {
      keyboardflag: false,
      showEmailPwdState: false
    }
  }

  componentWillMount () {
    // set listeners on when the keyboard is up or down
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    // remove the listeners upon exit
   this.keyboardDidShowListener.remove();
   this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    // use the spring animation when the key board is shown
    if ( true ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: true });
  }

  _keyboardDidHide () {
    // use the spring animation when the key board is hidden
    if ( true ) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: false });
  }

  _renderForm() {
    if ( this.props.emailPwdBtnStr == 'SignIn' ) {
      return (
        <View>
          <ScrollView>
          <EmailTextInput />
          <PwdTextInput />
          <EmailPwdButton
           emailPwdBtnStr={this.props.emailPwdBtnStr}
           onSubmit = {this.props.onSubmit}
           />
          <FooterNavButtons
            emailPwdBtnStr={this.props.emailPwdBtnStr}
            onNavPress={this.props.onNavPress}
          />
          </ScrollView>

        </View>
      );
    }else{
        return (
            
              <ScrollView>

              <EmailTextInput />
              <PwdTextInput />
              <FirstName/>
              <LastName/>
              <EmailPwdButton
               emailPwdBtnStr={this.props.emailPwdBtnStr}
               onSubmit = {this.props.onSubmit}
               />

              </ScrollView>

           
          );

    }
  }

//


  

  render() {

      android_s_c_marginTop = (this.state.keyboardflag) ? 30 : 0; 
      
      keyboardUp_justifyContent = (this.state.keyboardflag) ? 'flex-start' : 'space-between';
    

      // for the case where there is signup and showemailpwdstate button is not pressed
      if ( this.props.emailPwdBtnStr=='SignUp' && !this.state.showEmailPwdState ) {
        keyboardUp_justifyContent = 'flex-start';
      }

      let keyboardUp_styles_content = {justifyContent: keyboardUp_justifyContent};
      android_styles_container = {marginTop: android_s_c_marginTop};

      return (
        <View style={{ ...styles.screen, ...keyboardUp_styles_content}}>

          <LoadingSpinner />

         
          <LoginHeaderImage
            keyboardflag = {this.state.keyboardflag}
            emailPwdBtnStr={this.props.emailPwdBtnStr}
            />
          

          {this._renderForm()}

          <ErrorMessage />
        </View>
      );
  }

}

//
const mapStateToProps = (state , props) => {
  const { loginStatus, } = state.authReducer.auth;
  return { loginStatus, };
};

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
}));

export default connect(mapStateToProps,null)(Login);
