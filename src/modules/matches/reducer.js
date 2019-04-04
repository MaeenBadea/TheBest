import * as t from './actionTypes';

let initialState = {
    isLoading: false, 
    matches: [],
    homeTeam: 0, 
    awayTeam: 1, 
    homescore: '', 
    awayscore: '',
    date: [] , 

}


export default matchesReducer =  (state = initialState , action)=>{

    switch(action.type){
        case t.LOADING_MATCHES: {
            const matches = state.matches;

            //show loading signal
            if (matches.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.MATCHES_AVAILABLE: {
            let { payload } = action;
            let matches = [];

            payload.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                matches.push(item);
            });

            matches.reverse();

            return {...state, matches, isLoading: false};
        }

        case t.HOME_TEAM_CHANGED: {
            return {...state , homeTeam: action.payload}
        }

        case t.AWAY_TEAM_CHANGED: {
            return {...state , awayTeam: action.payload};
        }

        case t.HOME_SCORE_CHANGED:{
            return {...state , homescore: action.payload};
        }

        case t.AWAY_SCORE_CHANGED:{
            return {...state , awayscore: action.payload};
        }

        case t.CURRENT_DATE_SET:{
            return {...state , date: action.payload }
        }

        case t.LOGGED_OUT: {
            return {...state, matches: []};
          }
        default: 
          return state;
    }
};