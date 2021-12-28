import { combineReducers } from 'redux';
import {articles as blogStore} from "./articles";
import {user as userStore} from "./user";
import {categories as categoryStore} from "./categories";
import {tags as tagStore} from "./tags";
import {comments as commentStore} from "./comments";
import {likeState as likeStateStore} from "./likeState";

const rootReducer = combineReducers({
    blogStore,
    categoryStore,
    tagStore,
    userStore,
    commentStore,
    likeStateStore
});

export default rootReducer;
