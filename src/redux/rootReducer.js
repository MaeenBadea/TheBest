import {combineReducers} from 'redux';

import { reducer as authReducer } from "../modules/auth"
import {reducer as homeReducer} from '../modules/home'
import  {matchesReducer} from '../modules/matches'

const rootReducer = combineReducers({ authReducer , homeReducer , matchesReducer});

export default rootReducer;