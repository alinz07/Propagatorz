import CardList from "../components/CardList";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import { useStoreContext } from "../utils/globalState";
import { UPDATE_USERS, UPDATE_LOGGED_IN_USER } from "../utils/actions";
import Auth from "../utils/auth";

const Home = () => {
    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_ALL_USERS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_USERS,
                users: data.users,
            });
        }
    }, [data, loading, dispatch]);

    useEffect(() => {
        if (Auth.loggedIn()) {
            let zeToken = Auth.getToken();
            let currentUser = Auth.getUserProfile(zeToken).data.username;

            dispatch({
                type: UPDATE_LOGGED_IN_USER,
                loggedInUser: currentUser,
            });
        }
    }, []);

    return (
        <div className="cardlist-container">
            <CardList />
        </div>
    );
};

export default Home;
