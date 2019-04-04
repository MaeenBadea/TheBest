import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import Login from '../components/Login/Login';
import { register , errorSet } from '../actions';
import NavigatorService from '../../../utils/navigator';


class Register extends Component {

  constructor(props){
    super(props);
   

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }



  onSubmit(data){
    this.props.register(data , this.onSuccess , this.onError);
  }
  onSuccess() {
      //alert('registered.')
      console.log("registration successful");

   }

onError(error) {
    let errObj = '';
    let str = '';

    if (error.hasOwnProperty("message")) {
        errObj['general'] = error.message;
        str = error.message;
    } else {
        let keys = Object.keys(error);
        keys.map((key, index) => {
            errObj[key] = error[key];
            str += error[key];
        })
    }
    alert("registration failed: "+ str);

}


  render() {
      return (
          <Login
            emailPwdBtnStr='SignUp'
            onSubmit= {this.onSubmit}
          />
      )
  }
}

export default connect(null, {
  register , errorSet
})(Register);
