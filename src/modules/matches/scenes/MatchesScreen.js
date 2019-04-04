'use strict';
import  {
  View,Text,
  StyleSheet,
  Dimensions, 
  TouchableHighlight ,
   Image
} from 'react-native';
import React , {Component} from 'react';
import {connect} from 'react-redux'

import Matches from './Matches'
import Stats from './Stats';
import {getMatches } from '../actions';
import moment from 'moment-timezone';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import * as Progress from 'react-native-progress';

import crownIcon from '../../../assets/icons/crown.png';
import pantsIcon from '../../../assets/icons/pants.png';
import backIcon from '../../../assets/icons/back.png';


 class MatchesScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      opponentId: '' , 
      selectedIndex: 0,
     
    };
  }

   /* Get date format */
   getToday () {
    const dateString = moment.tz(Date.now(), 'Africa/khartoum').format()
    const dateArray = dateString.replace('T', '-').split('-')
    return dateArray.splice(0, 3)
  }

  componentWillMount(){
    const {navigation} = this.props;
    const data = navigation.getParam('opponent', {userId: null,  oppId: null});
    let {userId , oppId  } =  data  ;

    if(!(userId==null || oppId==null)){
      this.setState({
        opponentId: oppId
      })
      this.props.getMatches(data , (error)=> alert('error retrieving matches'))
    }else{
      console.log('userId or oppId is null');
    }
  }
  componentDidMount(){


  }

  handleIndexSelect = (index: number) => {
    this.setState( { selectedIndex: index });
  }

  getStatus(i){
    let statusStr = '';
    let statusIcon= null;
    switch(i){
      case 0:
        statusStr = 'You Suck';
        statusIcon = pantsIcon;
        break;
      case 1:
        statusStr =  'You Kinda Suck';
        break;
      case 2:
        statusStr = 'You TheBest';
        statusIcon = crownIcon;
        break;
    }
    return {statusStr , statusIcon};
  }

  render () {
    const date =  this.getToday();

    const {selectedIndex } = this.state;

    const {isLoading , matches} = this.props;
   
    const {status} = !isLoading?this.getResults(matches): 0;
    const {statusStr , statusIcon} = this.getStatus(status);

   
    
    return (
      
      <View style={styles.container}>
        <View style={styles.header}>

              <TouchableHighlight
                onPress={() => this.props.navigation.goBack() }
                underlayColor='transparent'>
                <Image
                  source = {backIcon}
                  style = {styles.backIcon}
                  
                  />
              </TouchableHighlight>

            <Text style={styles.matchDate}>{date[0] + '-' + date[1] + '-' + date[2]}</Text>
            <View style = {{flexDirection: 'row' ,paddingLeft: 15}}>
              <Text style={styles.isBest}>{statusStr}</Text>
              <Image source = {statusIcon} style = {styles.statusImage}/>
            </View>
        </View> 

        <View style = {styles.tabBarStyle}>
          <SegmentedControlTab
                values={['Matches', 'Stats']}
                selectedIndex={selectedIndex}
                onTabPress={this.handleIndexSelect}

              />
          </View>
          {isLoading && 
            <Progress.CircleSnail
              style={styles.progress}
              color={['#F44336', '#0076FF', '#0076FF']}
              />
          }
          {selectedIndex === 0  &&!isLoading &&<Matches opponentId = {this.state.opponentId}/>}
          {selectedIndex === 1
                    &&!isLoading && <Stats stats = {this.getResults(matches)}/>}

       </View>
        
        
    );
  }

  getResults(matches){
    if(matches===undefined){
        console.log('matches is undefined ..............');
        return this.state;
    }
    if(matches.length===0){
        console.log('Empty array of matches..............');
        return this.state;
    }
    let percentage = 0,  totalNumOfGames =0 , winNum =0 ,drawNum =0 , 
        loseNum =0,points =0 , scored =0 , conceded = 0 , status = 0 ;
    let teamsPlayedWith = [];
    let teamsPlayedAgainst = [];
    for(let i = 0 ; i<matches.length; i++){
        const match = matches[i];
      
        const hs =  parseInt(match.homescore, 0);;
        const as = parseInt(match.awayscore, 0);
        //key , pts , team
        scored += hs;
        conceded += as;

        let hgs = 0; //home gameStatus 
        let ags = 0; //away   ``
        if(hs>as){
            winNum +=1;
            hgs = 2;
        }else if(hs==as){
            drawNum +=1;
            hgs = 1;
            ags =1 ;
        }else{
            loseNum +=1;
            ags = 2;
        }

        const ht = match.homeTeam;
        const at = match.awayTeam;

        if(!this.exists(teamsPlayedWith , ht)){
            console.log('team '+ht +" not found and added");
            this.addTeam(teamsPlayedWith , ht , hgs )
        }else{
          console.log('team '+ht +" found and it's value changed");

            this.changeValue(teamsPlayedWith ,ht , hgs);
        }
        if(!this.exists(teamsPlayedAgainst ,at )){
          this.addTeam(teamsPlayedAgainst , at , ags)

        }else{
          this.changeValue(teamsPlayedAgainst ,at,  ags);
        }

    }
    totalNumOfGames = matches.length;
    percentage = Math.floor( ((winNum + 0.5*drawNum)/totalNumOfGames)*100 ); //draw is .5 win
    percentage /= 100;  
    points = winNum*3 + drawNum;
    if(percentage> .5) status = 2;
    else if(percentage==.5) status = 1;

    return  {percentage,totalNumOfGames , winNum , drawNum ,loseNum ,status ,points,  scored , conceded , teamsPlayedWith, teamsPlayedAgainst};
  }
  addTeam(arr , t , gameStatus){
    const KEY = "STH";
    switch(gameStatus){
      case 0: 
        arr.push({key: KEY+t , teamPts: 0, team: t});
        break;
      case 1:
        arr.push({key: KEY+t , teamPts: 1, team: t});
        break;
      case 2:
        arr.push({key: KEY+t , teamPts:3 , team: t});
        break;
    }

  }
  changeValue(arr ,  val ,  gameStatus ){
    const index  = arr.findIndex(obj => obj.team==val);
    const oldPts = arr[index].teamPts;
    switch(gameStatus){
      case 1:
        arr[index].teamPts = oldPts +1;
        break;
      case 2:
      arr[index].teamPts = oldPts + 3;
        break;
    }
  }

  exists(arr , val){
    return  arr.findIndex(obj => obj.team==val)!= -1;
  }
}



function mapStateToProps(state , props){
    return {
        isLoading : state.matchesReducer.isLoading, 
        matches: state.matchesReducer.matches, 
        user: state.authReducer.auth.user
      };

};

export default connect(mapStateToProps , {getMatches} )(MatchesScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1 
  },
    // Header
    header: {
      backgroundColor: '#0076FF',
      height: 100,
      flexDirection: 'column',
      position: 'relative',
    },
    calendarIcon: {
      alignSelf: 'flex-end',
      height: 15,
      marginRight: 15,
      marginTop: 12,
      width: 25
    },
    matchDate: {
      color: '#fff',
      fontWeight: '200',
      fontSize: 25 ,
      paddingLeft: 15

    },
    isBest: {
      color: '#fff',
      marginRight:5 , 
      fontWeight: '200',
      fontSize: 14
    },
    statusImage:{
      width: 20 ,
      height: 20 ,  
    },
    tabBarStyle: {
      margin: 10 , 
      backgroundColor: '#fff',

    },
    backIcon: {
      height: 30,
      marginLeft: 6,
      marginTop: 6,
      width: 30
    }
    
})

