import { combineReducers } from 'redux';
import {blog as blogStore} from "./blog";
import {user as userStore} from "./user";


const rootReducer = combineReducers({
    blogStore,
    userStore
});

export default rootReducer;
