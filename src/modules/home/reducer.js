import * as t from './actionTypes';

let initialState = {
    isLoading: false,
    opponents: [] ,
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case t.LOADING_OPPONENTS: {
            const opponents = state.opponents;

            //show loading signal
            if (opponents.length === 0) return {...state, isLoading: true}

            return state;
        }

        case t.OPPONENTS_AVAILABLE: {
            let { data } = action;
            let opponents = [];

            //convert the snapshot (json object) to array
            data.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                opponents.push(item);
            });

            opponents.reverse();

            return {...state, opponents, isLoading: false};
        }

        case t.LOGGED_OUT: {
            return {...state, opponents: []};
        }

        default:
            return state;
    }
};

export default homeReducer;