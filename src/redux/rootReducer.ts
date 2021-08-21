import { combineReducers } from 'redux';
import {articles as blogStore} from "./articles";
import {user as userStore} from "./user";


const rootReducer = combineReducers({
    blogStore,
    userStore
});

export default rootReducer;
