import * as t from './actionTypes';
import * as api from './api';

//Add Opponent
export function addOpponent(opp , successCB , errorCB){
    return (dispatch)=>{
        api.addOpponent(opp , function(success , data , error){
            if(success) successCB();
            else if(error) errorCB(error);
        }
      );
    };
}


//get opponents 
export function getOpponents(uid ,errorCB) {

    return (dispatch) => {
        dispatch({type: t.LOADING_OPPONENTS});
        api.getOpponents(uid , function (success, data, error) {
            if (success) dispatch({type: t.OPPONENTS_AVAILABLE, data});
            else if (error) errorCB(error)
        });
    };
}


//update Opponent
export function updateOpponent(opp, successCB, errorCB) {
    return (dispatch) => {
        api.updateOpponent(opp, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

//Delete Oppoent
export function deleteOpponent(opp, errorCB) {
    return (dispatch) => {
        api.deleteOpponent(opp, function (success, data, error) {
            if (error) errorCB(error)
        });
    };
}

