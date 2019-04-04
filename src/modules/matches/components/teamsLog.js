'use strict'

import  {
  View,
  StyleSheet,
  Dimensions , 
  Text
} from 'react-native'

import React ,{Component} from 'react'

import PtsBar from './ptsBar';


export default class PlayerLog extends Component {

  constructor (props) {
    super(props)
      //props.data =  { totalPoints:  , teams: [{team: , pts ,key },...]}
      const {data} = this.props; 
  
  }

  getWidth (teamPts, totalPts) {
    const deviceWidth = Dimensions.get('window').width
    const maxWidth = 350

    const unit = Math.floor(maxWidth / totalPts);
    let width = {}
    let widthCap // Give with a max cap

    widthCap = teamPts*unit|| 5
    width = widthCap <= (deviceWidth - 50) ? widthCap : (deviceWidth - 50)

    return width
  }

 


animate(key , pts) {
  let progress = 0 ;
  this.onChange( key, progress ) 
  setTimeout(() => {
    this.setState({ indeterminate: false });
    setInterval(() => {
      progress += Math.random() / 5;
      if (progress > pts) {
        progress = pts;
      }
      this.onChange(key , progress);
    }, 500);
  }, 1500);
}
  
  render () {

    const {teams , totalPoints} = this.props.data;


    return (
      <View style={styles.container}>
     
          {
            teams.map((data, idx) => {
                const { key, team , teamPts} = data;
                return(   
                          <PtsBar
                            key = {key}
                            width = {this.getWidth(teamPts , totalPoints)}
                            points = {teamPts}
                            team = {team}

                          />
                    );
              })
                    
            }
 

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1 , 
    marginTop: 20
  },
  // Item
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  teamName: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    top: 2
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  ptsText: {
    color: '#CBCBCB',
    fontSize: 11
  },
 
})

