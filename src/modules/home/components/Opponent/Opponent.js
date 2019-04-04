'use strict';
import React from 'react';

import { Text, View, TouchableOpacity,  TouchableHighlight } from 'react-native';

import { Icon } from 'react-native-elements'

import styles from "./styles"
import { connect } from "react-redux";

import { actions, theme } from "../.."

import ActionSheet from 'react-native-actionsheet';
import NavigatorService from '../../../../utils/navigator';


const { deleteOpponent } = actions;
const { normalize } = theme;

const CANCEL_INDEX = 1;
const DESTRUCTIVE_INDEX = 1;
//Buttons for Action Sheet
var options = ['Delete', 'Cancel'];


var colors = ['#FF6633',  '#00B3E6', 
'#E6B333', '#3366E6',   '#B34D4D',
'#80B300',  '#E6B3B3', '#6680B3', 
 '#B366CC', '#4D8000', '#B33300',
'#E666B3', '#33991A', '#CC9999',  '#00E680', 
'#4D8066', '#809980', 
 '#CCCC00',   
 '#4DB380', '#FF4D4D', '#6666FF'];
          



class Opponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.handlePress = this.handlePress.bind(this)
        this.onOption = this.onOption.bind(this);
        this.onDelete = this.onDelete.bind(this);

    }

    onPressRow(){
        const {opponents, index } = this.props;
        const opp = opponents[index];
        let {userId , id} = opp;
        let opponent = {userId , oppId: id}; // oppId = id;
        NavigatorService.navigate('matches_screen' , {opponent} );
        
    }    

    render() {
        const {opponents, index } = this.props;
        const opp = opponents[index];
        const { name  } = opp;
        const randNum = Math.floor(Math.random() * (21)) 

        return (
            <TouchableHighlight onPress={this.onPressRow.bind(this)} underlayColor='transparent'>

                <View style={[styles.container]}>
                    <View style={[styles.wrapper, {backgroundColor: colors[randNum], borderColor: colors[randNum]}]}>

                        <View style={[styles.opponent]}>
                            <Text style={[styles.text]}>
                                {name}
                            </Text>
                            { this.renderOptionButton()}
                        </View>

                        
                    </View>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        options={options}
                        cancelButtonIndex={CANCEL_INDEX}
                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                        onPress={this.handlePress}
                    />

                </View>
            </TouchableHighlight>
        );
    }

    //show options
    onOption(){
        this.ActionSheet.show();
    }
    //handle options
    handlePress(buttonIndex) {
        if (buttonIndex === 0) this.onDelete();
    }

    onDelete(){
        const { opponents, index } = this.props;
        const opp = opponents[index];

        this.props.deleteOpponent(opp, (error) =>  alert(error.message))
    }

    renderOptionButton(){
        return(
            <View style={styles.right}>
                <TouchableOpacity onPress={this.onOption}>
                    <View style={styles.buttonContainer}>
                        <Icon
                            name={'md-more'}
                            type='ionicon'
                            color='#fff'
                            size={normalize(20)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

function mapStateToProps(state, props) {
    return {
        user: state.authReducer.user,
        opponents: state.homeReducer.opponents
    }
}

export default connect(mapStateToProps, { deleteOpponent })(Opponent);