import { useReducer } from "react";
import { UPDATE_POSTS, UPDATE_USERS, UPDATE_FORMDATA } from "../utils/actions";

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case UPDATE_POSTS:
            return {
                ...state,
                products: [...action.products],
            };
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_USERS:
            return {
                ...state,
                categories: [...action.categories],
            };
        case UPDATE_FORMDATA:
            return {
                ...state,
                formData: [...action.formData],
            };

        default:
            return state;
    }
};

export function usePostReducer(initialState) {
    return useReducer(reducer, initialState);
}
