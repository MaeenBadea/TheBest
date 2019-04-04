'use strict'

import  {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import React , {Component} from 'react';
import * as Progress from 'react-native-progress';

import TEAMS from '../../../utils/teams';

export default class PtsBar extends Component {

  constructor (props) {
    super(props)
    this.state = {
      progress: 0,
      indeterminate: true,
    }
  }

  componentDidMount () {

    this.animate();
 }



  animate() {
    const num = 1;
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
  
  render () {
    const {points , team , width } = this.props;
    
    const teamName = TEAMS[team].team;
    const teamColor = TEAMS[team].color;
    return (
      <View style={styles.item}>
              <Text style={styles.teamName}>{teamName}</Text>
              <View style={styles.data}>
                <Progress.Bar
                    progress={this.state.progress}
                    width={width}
                    color = {teamColor}
                    borderColor = {'transparent'}
                    borderRadius = {5}
                    height = {8}
                />
                <Text style={styles.ptsText}>{points+" pts"}</Text>
              </View>
       </View>
    );
  }
}



const styles = StyleSheet.create({
  // Item
  item: {
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