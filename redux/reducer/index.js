import {combineReducers} from 'redux';
import wordReducer from './wordReducer';

const rootReducer = combineReducers({
    words: wordReducer,
});


export default rootReducer;