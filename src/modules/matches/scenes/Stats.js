'use strict'

import  {
  StyleSheet , 
  View , 
  Text ,
  TouchableHighlight, 
  Image 
} from 'react-native'
import React ,  {Component} from 'react';
import leftIcon from '../../../assets/icons/left.png';
import rightIcon from '../../../assets/icons/right.png';

import StatsView from '../components/DetailedStats';
import {normalize} from '../../../styles/theme';

export default class Stats extends Component {

  constructor(props){
    super(props);
    this.state = {
      isOpp: false ,
    }
  }

  componentDidMount () {
    //create keys using some str + teamsId
  }

  onPress(){
    this.setState({
      isOpp: !this.state.isOpp
    })
  }
  render () {
    const { totalNumOfGames , winNum ,drawNum , 
      loseNum ,points , scored , conceded , teamsPlayedWith,  teamsPlayedAgainst, percentage} = this.props.stats;
 

   
    const {isOpp} = this.state;
    const data = {
      totalPoints:  !isOpp? points: (loseNum*3 + drawNum),
      teams: !isOpp?teamsPlayedWith: teamsPlayedAgainst
    }
    const str = !isOpp?"You":(percentage>=.5 ? "حمامتك": "راجلك")
    return (
      <View style = {styles.container}> 
          <StatsView stats = {this.props.stats} data = {data}/>

          <View style={styles.controller}>
            <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='transparent' style={[styles.button, ]}>
            <Image  source={leftIcon} style={styles.chevronLeft}/>
          </TouchableHighlight>
              <Text style={styles.playerTxt}>{str}</Text>
            <TouchableHighlight onPress={this.onPress.bind(this)} underlayColor='transparent' style={[styles.button,]}>
            <Image source={rightIcon} style={styles.chevronRight}/>
          </TouchableHighlight>
          </View>

     </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1 , 
    marginTop: 10,
        backgroundColor: '#FFF',

  } ,

  // controller
  controller: {
    flexDirection: 'row',
    marginTop: 15
  },
  button: {
    flex: 1,
    position: 'relative',
    top: -1
  },
  chevronLeft: {
    alignSelf: 'flex-end',
    height: normalize(28),
    marginRight: 10,
    width: normalize(28)
  },
  chevronRight: {
    alignSelf: 'flex-start',
    height: normalize(28),
    marginLeft: 10,
    width: normalize(28)
  },
  playerTxt: {
    color: '#6B7C96',
    flex: 1,
    fontSize: 22,
    fontWeight: '300',
    height: 28,
    textAlign: 'center'
  }

});
