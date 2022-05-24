import { useReducer } from "react";
import {
    UPDATE_POSTS,
    UPDATE_USERS,
    UPDATE_FILTER,
    UPDATE_LOGGED_IN_USER,
    DELETE_A_POST,
} from "../utils/actions";

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case UPDATE_POSTS:
            return {
                ...state,
                posts: [...action.posts],
            };
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_USERS:
            return {
                ...state,
                users: [...action.users],
            };
        case UPDATE_FILTER:
            return {
                ...state,
                postFilter: !state.postFilter,
            };
        case UPDATE_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.loggedInUser,
            };
        case DELETE_A_POST:
            let newState = state.posts.filter((post) => {
                return post._id !== action._id;
            });
            return {
                ...state,
                posts: newState,
            };
        default:
            return state;
    }
};

export function usePostReducer(initialState) {
    return useReducer(reducer, initialState);
}
