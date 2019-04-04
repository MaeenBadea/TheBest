import * as t from './actionTypes';
import * as api from './api';

//data ={userId , oppId}
export function getMatches( data,  errorCB){
    return (dispatch)=>{
        dispatch({type: t.LOADING_MATCHES});
        api.getMatches(data , function(success , data , error){
            if(success) {
                dispatch({type: t.MATCHES_AVAILABLE,  payload: data});
            }
            else errorCB(error);
        }   
    );
    }
}

export function addMatch(match ,  successCB , errorCB){
    return (dispatch)=>{
        api.addMatch(match , function(success , data , error){
            if(success) successCB();
            else errorCB(error);
        });
    }
}

export function deleteMatch(match ,  successCB , errorCB){
    return (dispatch)=>{
        api.deleteMatch(match , function(success , data , error){
            if(success) successCB();
            else errorCB(error);
        });
    }
}

export const homeTeamChanged = (num) => {
    return (dispatch) => {
      dispatch({
        type: t.HOME_TEAM_CHANGED ,
        payload: num
      }); 
   };
}

   export const awayTeamChanged = (num) => {

    return (dispatch) => {
      dispatch({
        type: t.AWAY_TEAM_CHANGED,
        payload: num
      }); 
   };
}
   export const homeScoreChanged = (text) => {
    return (dispatch) => {
      dispatch({
        type: t.HOME_SCORE_CHANGED ,
        payload: text
      }); 
   };
}
   export const  awayScoreChanged= (text) => {
    return (dispatch) => {
      dispatch({
        type: t.AWAY_SCORE_CHANGED,
        payload: text
      }); 
   };
}
   export const setCurrentDate = (text) => {
    return (dispatch) => {
      dispatch({
        type: t.CURRENT_DATE_SET,
        payload: text
      }); 
   };
}