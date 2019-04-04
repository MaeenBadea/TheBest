import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from '../components/Login/Login';
import { login , errorSet } from '../actions';
import NavigatorService from '../../../utils/navigator';


class Login_Screen extends Component {
  constructor(props){
    super(props);
    state = {
      error: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount(){
    
  }

  onSubmit(data){
    this.props.login(data , this.onSuccess , this.onError);
  }

  onSuccess({exists, user}) {
   alert('successfull login');
  
}

onError(error) {
    let errObj = '';

    if (error.hasOwnProperty("message")) {
        errObj['general'] = error.message;
    } else {
        let keys = Object.keys(error);
        keys.map((key, index) => {
            errObj[key] = error[key];
        })
    }
    this.props.errorSet(errObj);
}

  render() {
      return (
          <Login
            emailPwdBtnStr='SignIn'  
            onSubmit = {this.onSubmit}      
            onNavPress={ () => { NavigatorService.reset('register_screen'); } }
          />
      )
  }
}

export default connect(null, {
  login ,errorSet
})(Login_Screen);
