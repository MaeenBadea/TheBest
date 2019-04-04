import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';

import { scaleModerate, scaleVertical } from '../../../../utils/scale';

import {
  RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';




class LoginHeaderImage extends Component {

  constructor(props) {
      super(props)
     
  }

 

  _renderImage(image) {

    if ( this.props.keyboardflag == false) {

        if ( this.props.emailPwdBtnStr == 'SignUp' || this.props.emailPwdBtnStr == 'SignIn') {
          let contentHeight = scaleModerate(350, 1);
          let height = Dimensions.get('window').height - contentHeight;
          let width = Dimensions.get('window').width;
          image = (<Image style={[styles.image, {height, width}]}
                          source={require('../../../../assets/logo.jpg')}/>);
          return image
        }
       
    } else {
      return;
    }
  }

  render() {
    return (
      <View>
        {this._renderImage()}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    loginStatus: state.authReducer.auth.loginStatus
  };
};

let styles = RkStyleSheet.create(theme => ({
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
 
}));

export default connect(mapStateToProps,null)(LoginHeaderImage);
