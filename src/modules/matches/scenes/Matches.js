'use strict'

import  {
View ,
} from 'react-native'
import React ,  {Component} from 'react';

import MatchesList from '../components/MatchesList'

export default class Matches extends Component {

  componentDidMount () {
  }


  render () {
    return (
      <MatchesList opponentId = {this.props.opponentId}/>
      // add activity indicator for pagination 


    )
  }
}



