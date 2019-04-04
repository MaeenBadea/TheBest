'use strict'
import {
  StyleSheet,
  View,
  Text,
  FlatList, 
  TouchableHighlight
} from 'react-native';
import React , {Component} from 'react';
import moment from 'moment-timezone'
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import {
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';

import { addMatch , homeTeamChanged , homeScoreChanged , awayScoreChanged , awayTeamChanged, setCurrentDate} from '../actions' ;

import MatchModal from './MatchModal';
import MatchPanel from './MatchPanel'
import {GradientButton} from '../../../components/gradientButton';




 class MatchesList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      date: this.getToday(),
      isModalVisible: false ,
    }

    this.renderItem = this.renderItem.bind(this);
    this.showNewMatchDialog = this.showNewMatchDialog.bind(this);
  this.onSaveMatch = this.onSaveMatch.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);


    
  }

  componentDidMount () {
  

  }
  
  

  renderItem ({item , index}) {
    return (<MatchPanel   index={index} />)
  }

  /* Get date format */
  getToday () {
    const dateString = moment.tz(Date.now(), 'Africa/khartoum').format()
    const dateArray = dateString.replace('T', '-').split('-')
    return dateArray.splice(0, 3)
  }
  _matchReset(){
    //reset
    this.props.homeTeamChanged(0);
    this.props.awayTeamChanged(1);
    this.props.homeScoreChanged('');
    this.props.awayScoreChanged('');
    this.props.setCurrentDate([]);
  }

  render () {

    return (
      <View style={styles.container}>
       

        <FlatList
          style={styles.listView}
          ref='listRef'
          data={this.props.matches}
          renderItem={this.renderItem}
          initialNumToRender={5}
          keyExtractor={(item, index) => index.toString()} 
        />

        <TouchableHighlight
          style={styles.addButton}
          underlayColor='#ff7043' onPress={this.showNewMatchDialog}>
          <Text style={{fontSize: 25, color: 'white'}}>+</Text>
        </TouchableHighlight>

        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => {
            this.setState({ isModalVisible: false })
            this._matchReset();
          } }
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
  
      
 /*
  * <-----------------------------------------modal start------------------------------------------------>
  */
 
  showNewMatchDialog(){
    this.setState({
      isModalVisible: true
    });
  }

  renderFormError() {
    return (<RkText rkType='danger'> {this.state.error} </RkText>);
  }
  renderModalContent = () =>{ 
    return(
    <View style = {rkstyles.matchPanel}>

      <View>
          { this.renderFormError() }
      </View>
      <MatchModal/>

      {this.renderButton()}
    
    </View>
    );
     };
    

    renderButton = () => (
      <GradientButton
        rkType='small'
        colors = {['lightgrey', 'grey'] }
        style={rkstyles.button}
        text={'Save'}
        onPress = {this.onSaveMatch.bind(this)}
        />
    );

  
    onSaveMatch(){
        
        const {user , opponentId} = this.props;  //opponentId is passed from Matches ^.^
        const {homeTeam , awayTeam , homescore , awayscore , date} = this.props;
        console.log('loggggg: '+date[0]+"-"+date[1]+"-"+date[2]);
        //match object
        const newMatch = {
          homeTeam, 
          awayTeam , 
          homescore , 
          awayscore ,
          date :this.getToday(),
          oppId: opponentId , 
          userId: user.uid,
            
        };
        //scores not empty
        
        if(homeTeam!==undefined && awayTeam!==undefined && homescore!==undefined && awayscore!==undefined && date!==undefined&& homescore!='' &&awayscore!=''){
          this.props.addMatch(newMatch, this.onSuccess, this.onError)
          console.log('adding a new match');
        }else{
            if(homeTeam===undefined){
              console.log('homeTEam is null');

            }else if(awayTeam===undefined){
              console.log('awayTeam is null');

            }else if(homescore===undefined){
              console.log('homescore is null');

            }else if(awayscore===undefined){
              console.log('awayscore is null');

            }else if(date===undefined){
              console.log('date is null');
            }else{
              console.log('please input the scores')
            }
        }
    }
  

    onSuccess(){
      this.setState({
        isModalVisible: false , 
       });
       this._matchReset();
    }

    onError(error){
      this.setState({
        error: error.message
      });
//      alert('error: '+ error.message);
    }
    
}

/*
*<---------------------------------------modal end------------------------------------------------>
*/

 



function mapStateToProps (state , props){
  return({
    isLoading: state.matchesReducer.isLoading , 
    matches: state.matchesReducer.matches , 
    homeTeam: state.matchesReducer.homeTeam, 
    awayTeam: state.matchesReducer.awayTeam, 
    homescore: state.matchesReducer.homescore, 
    awayscore: state.matchesReducer.awayscore,
    date: state.matchesReducer.date , 
    user: state.authReducer.auth.user,
    });
}

export default connect(mapStateToProps , { addMatch , homeTeamChanged , homeScoreChanged , awayScoreChanged , awayTeamChanged, setCurrentDate})(MatchesList);

let rkstyles = RkStyleSheet.create((theme) => ({
 
  matchPanel: {
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
  
  

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  // List View
  listView: {
    backgroundColor: '#fff',
    flex: 6,
    flexDirection: 'column',
    paddingTop: 12
  },
  addButton:{
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
        height: 1,
        width: 0
    }
} ,
})



