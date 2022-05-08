import CardList from "../components/CardList";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_USERS } from "../utils/queries";
import { useStoreContext } from "../utils/globalState";
import { UPDATE_USERS } from "../utils/actions";

const Home = () => {
    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_ALL_USERS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_USERS,
                users: data.users,
            });
            // console.log(state);

            //also take each prodcut and save it to IndexedDB using the helper function
            // data.products.forEach((product) => {
            //     idbPromise("products", "put", product);
            // });
            // } else if (!loading) {
            //     //since we're offline, get all of the data from the 'products' store
            //     idbPromise("products", "get").then((products) => {
            //         //use retrieved data to set global state for offline browsing
            //         dispatch({
            //             type: UPDATE_PRODUCTS,
            //             products: products,
            //         });
            //     });
        }
    }, [data, loading, dispatch]);

    return (
        <div className="cardlist-container">
            <CardList />
        </div>
    );
};

export default Home;
