'use strict'

import {
  
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  
} from 'react-native';

import React , {Component} from 'react';
import {connect} from 'react-redux';
import * as Progress from 'react-native-progress';

import TeamsLog from './teamsLog';

const navigationHeight = 30
const headerHeight = 120

 class DetailedStats extends Component {

  constructor (props) {
    super(props)
    this.state = {
      progress: 0,
      indeterminate: true,
    }
  }

  componentDidMount () {

    this.animate(this.props.stats.percentage);
 }

 animate(num) {
  let progress = 0;
  this.setState({ progress });
  setTimeout(() => {
    this.setState({ indeterminate: false });
    setInterval(() => {
      progress += Math.random() / 5;
      if (progress > num) {
        progress = num;
      }
      this.setState({ progress });
    }, 500);
  }, 1500);
  
}
 
  color(p){
    if(p>.5) return '#FFF';
    else if(p==.5) return 'yellow'
    else return 'red'
  }

  render () {
    
    const { totalNumOfGames , winNum ,drawNum , 
            loseNum ,points , scored , conceded} = this.props.stats;
    /* ScrollView need a specific height */
    const scrollHeight = Dimensions.get('window').height - navigationHeight - headerHeight
    return (
        
          <View style = {styles.container}>


            <View style={styles.header}>
              <View style={styles.portraitView}>
               
                <Progress.Circle
                  style={styles.progress}
                  color = {this.color(this.state.progress)}
                  borderColor = {this.color(this.state.progress)}
                  progress={this.state.progress}
                  indeterminate={this.state.indeterminate}
                  showsText = {true}
                  size = {100}
                 />
        
              </View>
              <Text style={styles.totalNumOfGames}>{totalNumOfGames}</Text>
            </View>

            <ScrollView style={{height: scrollHeight , backgroundColor: "#FFF"}}>
              <View style={styles.basicData}>
                <View style={styles.basicDataBlock}>
                  <Text style={styles.basicDataNumber}>{winNum}</Text>
                  <Text style={styles.basicDataMark}>Win</Text>
                </View>

                <View style={styles.basicDataBlock}>
                  <Text style={styles.basicDataNumber}>{drawNum}</Text>
                  <Text style={styles.basicDataMark}>Draw</Text>
                </View>
                <View style={styles.basicDataBlock}>
                  <Text style={styles.basicDataNumber}>{loseNum}</Text>
                  <Text style={styles.basicDataMark}>Defeats</Text>
                </View>
              </View>

              <View style={styles.basicData}>
                <View style={styles.basicDataBlock}>
                  <Text style={styles.basicDataNumber}>{points}</Text>
                  <Text style={styles.basicDataMark}>Points</Text>
                </View>

                <View style={styles.basicDataBlock}>
                  <Text style={styles.basicDataNumber}>{scored}</Text>
                  <Text style={styles.basicDataMark}>Goals scored</Text>
                </View>
                <View style={styles.basicDataBlock}>
                  <Text style={styles.basicDataNumber}>{conceded}</Text>
                  <Text style={styles.basicDataMark}>Goals conceded</Text>
                </View>
              </View>

             <TeamsLog data = {this.props.data}/>

            </ScrollView>

            
          </View>
        

    )
  }

  
}

const mapStateToProps = (state , props)=>{
    return {
        user: state.authReducer.auth.user, 
        matches: state.matchesReducer.matches
    };
}

export default connect(mapStateToProps , null)(DetailedStats);

 

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  // Header part
  header: {
    height: headerHeight, 
    backgroundColor: '#4D98E4'
  },
  portraitView: {
    alignSelf: 'center',
    backgroundColor: '#0076FF',
    borderRadius: 110, 
    marginTop: 5,
    height: 110,
    width: 110
  },
  
  portrait: {
    height: 60,
    width: 60,
  },
  progress:{   
    alignSelf: 'center',
    marginTop: 5,
  }
  ,
  totalNumOfGames: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    marginTop: 5
  },
  jersey: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 14
  },
  // Basic data
  basicData: {
    flexDirection: 'row',
    height: 28,
    justifyContent: 'center'
  },
  basicDataBlock: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 100
  },
  basicDataNumber: {
    color: '#909CAF',
    fontSize: 19,
    fontWeight: '500',
    marginRight: 3
  },
  basicDataMark: {
    color: '#909CAF',
    fontSize: 12,
    position: 'relative',
    bottom: 1
  },
  
})

