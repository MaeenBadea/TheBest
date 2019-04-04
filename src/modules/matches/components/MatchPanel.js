'use strict'

import  {
    StyleSheet,
  View,
  Text,
  TextInput, 
  TouchableHighlight,
  Image,
  PixelRatio,
  Platform
} from 'react-native'
import React,  {Component} from 'react';
import {connect} from 'react-redux';

import { deleteMatch} from '../actions'

import ActionSheet from 'react-native-actionsheet';
import teamMap from '../../../utils/teams'

const CANCEL_INDEX = 1;
const DESTRUCTIVE_INDEX = 1;
//Buttons for Action Sheet
var options = ['Delete', 'Cancel'];


 class MatchModal extends Component {
    constructor(props){
      super(props);

      this.state = {
        enableButton: false,
      };
      
    }

  
    //show options
    showOptions(){
          this.ActionSheet.show(); //ref assigned inside the render
    }
    //handle options
    handlePress(buttonIndex) {
        if (buttonIndex === 0) this.onDelete();
    }

    onDelete(){
        const { matches, index } = this.props;
        const match = matches[index];

        this.props.deleteMatch(match, (error) =>  alert(error.message));
    }


  render () {
    const {matches , index} = this.props;
    const match = matches[index];

    const {homeTeam , awayTeam , homescore , awayscore, date} = match;
    
    let cssType = 'Unstart';



    const homeTeamLogo = teamMap[homeTeam].logo;
    const awayTeamLogo = teamMap[awayTeam].logo;


    return (

      <TouchableHighlight onPress={this.showOptions.bind(this)} underlayColor='transparent'>
        <View style={[styles.container, {backgroundColor: teamMap[homeTeam].color}]} >

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={homeTeamLogo}/>
            <Text style={styles.teamCity}>{teamMap[homeTeam].city}</Text>
            <Text style={styles.teamName}>{teamMap[homeTeam].team}</Text>
          </View>

          <View style={styles.gameInfo}>
            <Text style={[styles.infoProcess, styles.dateText]}>{date[0]+"-"+date[1]+"-"+date[2]}</Text>
            {
              <View style={styles.infoScorePanel}>
                <Text style={styles.infoScore}>{homescore}</Text>
                <View style={styles.infoDivider} />
                <Text style={styles.infoScore}>{awayscore}</Text>
              </View>
            }
          </View>

          <View style={styles.team}>
            <Image style={styles.teamLogo} source={awayTeamLogo} />
            <Text style={styles.teamCity}>{teamMap[awayTeam].city}</Text>
            <Text style={styles.teamName}>{teamMap[awayTeam].team}</Text>
          </View>

          <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={this.handlePress.bind(this)}
                    />
        </View>

      </TouchableHighlight>
    );
  }
 
   

    
}

const mapStateToProps = (state , props)=>{
  return {
    matches: state.matchesReducer.matches, 
   
  };
};

export default connect(mapStateToProps , {deleteMatch,})(MatchModal);

const matchFontSize = Platform.OS === 'ios' ? 31 : 25

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    height: 95,
    marginHorizontal: 12,
    marginBottom: 10
  },
  // Team
  team: {
    alignItems: 'center',
    borderRadius: 5,
    flex: 1.5
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginTop: 10
  },
  teamCity: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2
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
    alignItems: 'center',
    flex: 1.5,
    flexDirection: 'column'
  },
  scoreInput:{
       textAlign: 'center',
       height: 50,
       borderWidth: 2,
       borderColor: '#FF5722',
       borderRadius: 10 ,
       backgroundColor : "#FFFFFF"   
  },
  infoProcess: {
    color: '#fff',
    fontSize: 10,
    marginTop: 22,
    marginBottom: 3
  },
  dateText: {
    fontSize: 22,
    position: 'relative',
    top: 13
  },
  infoScorePanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
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
 
})
