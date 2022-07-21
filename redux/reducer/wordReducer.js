import { STORE_WORDS } from "../actions/Types";


const initialState = {
    words: []
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action){
    switch(action.type){
        case STORE_WORDS:
            return{
                ...state,
                words: action.payload
            }
        default:
            return state;
    }
}