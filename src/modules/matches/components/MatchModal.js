'user strict';

import  {
    StyleSheet,
  View,
  Text,
  TextInput, 
 
  PixelRatio,
  Platform
} from 'react-native'
import React,  {Component} from 'react';
import {connect} from 'react-redux';

import {addMatch , homeTeamChanged , homeScoreChanged , awayScoreChanged , awayTeamChanged, currentDateSet} from '../actions';
import TEAMS from '../../../utils/teams';


import SliderEntry from './SliderEntry';

 class MatchModal extends Component {
    constructor(props){
      super(props);
     

    }

  
 

  render () {
    const {homeTeam , awayTeam } = this.props;
    const {homescore , awayscore } = this.props;

   

    if (TEAMS && TEAMS[homeTeam]){
      const ht = TEAMS[homeTeam] ;
      const at = TEAMS[awayTeam];
     

    return (
   
      <View style={[styles.container, {backgroundColor: ht.color}]} >

      <View style={styles.team}>
        <SliderEntry  isHome = {true} firstItem ={homeTeam}/>
        <Text style={styles.teamName}>{ht.team}</Text>
      </View>

      <View style={styles.gameInfo}>
        {
          <View style={styles.infoScorePanel}>
            {this._renderTextInput(homescore ,ht.color ,true )}
            <View style={styles.infoDivider} />
            {this._renderTextInput(awayscore , ht.color ,false )}
          </View>
        }
      </View>

      <View style={styles.team}>
        <SliderEntry  isHome = {false} firstItem = {awayTeam}/>
        <Text style={styles.teamName}>{at.team}</Text>
      </View>

     </View>


    );

    }
   

    
  }
 
    _renderTextInput = (val , bc , isHome)=>(
      <View style= {styles.TextInputContainer}>
        <TextInput
          style = {[styles.TextInput, {borderColor: bc} ]}
          onChangeText = {text => this.onChangeText(text , isHome)}
          value = {val}
          keyboardType = 'numeric'
          maxLength ={2}
        />
        </View>
    );
    onChangeText(text , isHome){
      isHome? this.props.homeScoreChanged(text): this.props.awayScoreChanged(text);
      isHome?console.log('homeScore: '+this.props.homescore):console.log('awayScore: '+this.props.awayscore);
    }

}

const mapStateToProps = (state , props)=>{
  return {
    homeTeam: state.matchesReducer.homeTeam, 
    awayTeam: state.matchesReducer.awayTeam, 
    homescore: state.matchesReducer.homescore, 
    awayscore: state.matchesReducer.awayscore,
    user: state.authReducer.auth.user,
  };
};

export default connect(mapStateToProps , {addMatch , homeTeamChanged , homeScoreChanged , awayScoreChanged , awayTeamChanged, currentDateSet})(MatchModal);

const matchFontSize = Platform.OS === 'ios' ? 31 : 25

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flexDirection: 'row',
    height: 130,
    marginHorizontal: 12,
    marginBottom: 10
  },
  // Team
  team: {
    alignItems: 'center',
    justifyContent: 'center' ,

    borderRadius: 5,
    flex: 1.5
  },
 
  teamName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    position: 'relative',
    top: 0
  },
  // Info
  gameInfo: {
    marginLeft:20 ,
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column'
  },
  scoreInput:{
       textAlign: 'center',
       height: 50,
       borderWidth: 2,
    
  },
  infoProcess: {
    color: '#fff',
    fontSize: 10,
    marginTop: 22,
    marginBottom: 3
  },
 
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center' ,
    alignItems: 'center'
  },
  infoScore: {
    color: '#fff',
    fontWeight: '100',
    fontSize: matchFontSize,
    textAlign: 'center',
    width: 50
  },
  infoDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    height: 25,
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    width: 2 / PixelRatio.get()
  } ,
  TextInputContainer:{
    borderWidth: 1, 
    borderColor: 'white' , 
    width: 40 ,
    height: 40,
    borderRadius: 5,
  }, 
  TextInput:{
    borderWidth: 3, 
    fontWeight: '100',
    fontSize: matchFontSize,
    textAlign: 'center',
    backgroundColor: 'white',
    padding:4, 
    borderRadius: 5,
  },
})
