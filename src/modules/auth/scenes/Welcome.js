import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';

import {RkStyleSheet} from 'react-native-ui-kitten';
import {GradientButton} from '../../../components/gradientButton';
import {Walkthrough} from '../components/walkthrough';
import WalkthroughItem from '../components/WalkthroughItem';

import {PaginationIndicator} from '../../../components/paginationIndicator';
import { loginStatusChanged, authStateChanged, fontLoadedChanged } from '../actions/AuthActions';
import AppSpinner from '../../../components/Loading/AppSpinner';
import NavigatorService from '../../../utils/navigator';
import ErrorMessage from '../../../components/ErrorMessage';
import loadAssetsAsync from '../../../utils/loadFonts';

import wt1 from '../../../assets/wt1.jpg';
import wt2 from '../../../assets/wt2.jpg';
import wt3 from '../../../assets/wt3.jpg'; 

class Welcome extends Component {

 
  constructor(props) {
    super(props);
    this.state = {index: 0};

  }

  async componentDidMount() {
    await this._loadFonts();

    console.log('authstatechanged');
    this.props.authStateChanged();

    
  }

   _loadFonts=  ()=>{
    console.log('loadAssetAsync');
    if ( !this.props.fontLoaded ) {
      loadAssetsAsync();
      console.log('All fonts loaded !');
      this.props.fontLoadedChanged(true);
      // note that the authStateChanged is only called
      // initally when the fonts are loaded
     
    }
  }


  changeIndex(index) {
    this.setState({index})
  }

  render() {
    if (!this.props.fontLoaded) {
      console.log('font not loaddedd ');
      return ( <AppSpinner /> );
    }

    return (
      <View style={styles.screen}>
      <ErrorMessage />
        <Walkthrough onChanged={(index) => this.changeIndex(index)}>
          <WalkthroughItem text ={"The Best there is."} pic = {wt1}/>
          <WalkthroughItem text ={"The Best there was."} pic = {wt2}/>
          <WalkthroughItem text ={"The Best there will ever be."} pic = {wt3}/>
        </Walkthrough>
        <PaginationIndicator length={3} current={this.state.index}/>
        <GradientButton
          rkType='large'
          style={styles.button}
          text="GET STARTED"
          colors = {['#0076FF' , '#ff6e7f' , '#0076FF']}
          onPress={()=> {
            NavigatorService.reset('login_screen');
          }}/>
      </View>
    )
  }
}


const mapStateToProps = (state , props) => {
  const { loginStatus, fontLoaded } = state.authReducer.auth;
  return { loginStatus, fontLoaded };
};

let styles = RkStyleSheet.create(theme => ({
  screen: {
    backgroundColor: theme.colors.screen.base
    ,paddingVertical: 0,
    alignItems: 'center',
    flex: 1,
  },
  button: {
    marginTop: 25,
    marginHorizontal: 16,
    marginBottom: 25
  }
}));

//export default Welcome_Screen;
export default connect( mapStateToProps , {loginStatusChanged, authStateChanged, fontLoadedChanged})(Welcome);
