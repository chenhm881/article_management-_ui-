import { combineReducers } from 'redux';
import {articles as blogStore} from "./articles";
import {user as userStore} from "./user";
import {categories as categoryStore} from "./categories";
import {tags as tagStore} from "./tags";

const rootReducer = combineReducers({
    blogStore,
    categoryStore,
    tagStore,
    userStore
});

export default rootReducer;
