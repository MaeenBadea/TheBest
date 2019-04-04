'use strict';

import React from 'react';
import {View, FlatList, ActivityIndicator ,Text ,
  TextInput , TouchableHighlight
  , TouchableOpacity} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import {GradientButton} from '../../../../components/gradientButton';

import {connect} from 'react-redux';

import {actions as home} from '../../index';
const { getOpponents , addOpponent , updateOpponent } = home;

import styles from './styles';
import Opponent from '../../components/Opponent';
import Modal from 'react-native-modal';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false ,
      name:  '',
      enableButton: false,
      error: ''
    };

    this.renderItem = this.renderItem.bind(this);
    this.showNewOppDialog = this.showNewOppDialog.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSaveOpp = this.onSaveOpp.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);


  }

  componentDidMount() {

    this.props.getOpponents(this.props.user.uid , (error) => alert(error.message) );
  }


      renderItem({item, index}) {
  
        return <Opponent index={index}/>;
      }

      render() {
        console.log(this.props.isLoading?"shit is true": "shit is false");
        if (this.props.isLoading){
          return(
            <View style={styles.activityIndicator}>
              <ActivityIndicator animating={true}/>
            </View>
          );
        }else{

          return (
            <View style={styles.container}>

                <View style={styles.header}>
                  <Text style={styles.opponents}>Opponents</Text>
                </View> 

              <FlatList
                ref='listRef'
                data={this.props.opponents}
                renderItem={this.renderItem}
                initialNumToRender={5}
                keyExtractor={(item, index) => index.toString()} />

              <TouchableHighlight
                style={styles.addButton}
                underlayColor='#ff7043' onPress={this.showNewOppDialog}>
                <Text style={{fontSize: 25, color: 'white'}}>+</Text>
              </TouchableHighlight>

              <Modal
                isVisible={this.state.isModalVisible}
                onBackdropPress={() => this.setState({ isModalVisible: false ,opponent: null })}
                animationInTiming={1000}
                animationOutTiming={500}
                backdropTransitionInTiming={1000}
                backdropTransitionOutTiming={500}
              >
                {this.renderModalContent()}
              </Modal>

            </View>
          );
        }
      }

      
 /*
  * <-----------------------------------------modal start------------------------------------------------>
  */

  //didn't use redux here bcoz this component is simple 
  onChangeText(text){
    const enable = (text.trim().length > 0); 
    this.setState({name: text , enableButton: enable });
  }

    _toggleModal = () =>
      this.setState({ isModalVisible: !this.state.isModalVisible });
    

    showNewOppDialog(){
      this.setState({
        isModalVisible: true
      });
    }

    renderFormError() {
      return (<RkText rkType='danger'> {this.state.error} </RkText>);
    }
    renderModalContent = () => (

      <View style = {rkstyles.opponentTextInput}>
        <View>
          { this.renderFormError() }
        </View>
            
        <RkTextInput
          rkType='rounded'
          placeholder='Opponent'
          value={this.state.name}
          autoFocus={true}
          placeholderTextColor={'#ccc'} 
          onChangeText={this.onChangeText}
        />
        {this.renderButton()}

      </View>
     

    );

      renderButton = () => (
        <GradientButton
          rkType='small'
          colors = {this.state.enableButton ?false :  ['lightgrey', 'grey'] }
          style={rkstyles.button}
          text={'Save'}
          
          onPress = {this.onSaveOpp}
          />
      );

    
      onSaveOpp() {
        this.saveOpponent();
        //I might add edit option in the futre

      }

      //saveBtn   
      saveOpponent(){
        const {user} = this.props;
        const newOpponent = {
          matches: [],
          name: this.state.name,
          userId: user.uid,
            
        };
        this.props.addOpponent(newOpponent, this.onSuccess, this.onError)

      }

      onSuccess(){
        console.log('new opponent added successfully!');
        this.setState({
          name:'' ,
          isModalVisible: false
         });
      }

      onError(error){
        this.setState({
          error: error.message
        });
        alert(error.message);
      }
}

/*
 *<---------------------------------------modal end------------------------------------------------>
 */


function mapStateToProps(state, props) {
  return {
    isLoading: state.homeReducer.isLoading,
    opponents: state.homeReducer.opponents, 
    user: state.authReducer.auth.user

  };
}

export default connect(mapStateToProps, { getOpponents , addOpponent , updateOpponent })(Home);

let rkstyles = RkStyleSheet.create((theme) => ({
   
  opponentTextInput: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20
  }, 
  button: {
    marginTop: 25,
    marginHorizontal: 50,
    marginBottom: 25
  }
}));
  