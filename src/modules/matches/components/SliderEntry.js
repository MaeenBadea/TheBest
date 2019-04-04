'use strict'
import { StyleSheet, View, Image } from 'react-native';
import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel'; 
import TEAMS from '../../../utils/teams';

import {  homeTeamChanged , awayTeamChanged} from '../actions';
import {connect} from 'react-redux';


 class SliderEntry extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
        
        };
        this._renderItem = this._renderItem.bind(this);
    }

    _renderItem({ item, index  }) {
       
        return (
        <View style = {styles.imageContainer}>
            <Image  style = {styles.image} source ={item.logo}></Image>
        </View>
        );
       
    }

    onSlide(slideIndex){
        const {isHome } = this.props;
        isHome?this.props.homeTeamChanged(slideIndex):this.props.awayTeamChanged(slideIndex);

        /*const { homeTeam , awayTeam} = this.props;
        const i = isHome? homeTeam: awayTeam;
        const team = TEAMS[i];
        const str = isHome? "changing home": "changing away";
        if(team){
            console.log(str +  "--> index = "+slideIndex + " ,home: "+homeTeam+ " ,away: "+awayTeam);
        }else{
            alert(str + ' bad stuff happening '+ "---->"+slideIndex);
        }*/

    }
    

  render() {
      
    
    const sliderWidth = 55;
    const sliderHeight = 60;
    const itemWidth = 50;
    const itemHeight = 50;

    
    return (
        <View style = {styles.contianer}>
        <Carousel
            layout={'stack'}
            data={TEAMS}
            firstItem = {this.props.firstItem}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={sliderHeight}
            itemHeight = {itemWidth}
            sliderHeight = {itemHeight}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            enableMomentum={true}
            activeSlideAlignment={'start'}
            removeClippedSubviews={false}
            onBeforeSnapToItem = {slideIndex => this.onSlide(slideIndex)}
     />
     </View>
    );
  }
}

const mapStateToProps = (state , props)=>{
    return {
      homeTeam: state.matchesReducer.homeTeam, 
      awayTeam: state.matchesReducer.awayTeam, 
    };
  };
  
  export default connect(mapStateToProps , {  homeTeamChanged , awayTeamChanged})(SliderEntry);


const styles =  StyleSheet.create({
    contianer:{
        width: 55 ,
        height:60  , 
        marginTop: 10
    },
    imageContainer: {
        backgroundColor: 'transparent',
        borderRadius: 15 ,
        width: 50,
        height: 50
    }, 
    image: {
        width: 50 ,height: 50 ,
    }, 

});