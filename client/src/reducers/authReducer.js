import {SET_CURRENT_USER, GET_ERRORS} from '../actions/types';
import isEmpty from '../actions/utils/isEmpty';

const initialState = {
    isAuthenticated: false,
    errors: []
}


export default  (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user:action.payload,
                errors:[]
            }

        case GET_ERRORS:
            console.log(action.payload)
            // allows for us to loop through an array of errors.
            return{
            	errors: [action.payload]
            }     

        default:
            return state;
    }
}