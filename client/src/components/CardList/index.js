import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useStoreContext } from "../../utils/globalState";
import PostCard from "../Card";
import { QUERY_ALL_POSTS } from "../../utils/queries";
import { UPDATE_POSTS } from "../../utils/actions";

function CardList() {
    const [state, dispatch] = useStoreContext();

    const { posts } = state;

    const { loading, data } = useQuery(QUERY_ALL_POSTS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_POSTS,
                posts: data.posts,
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

    //maybe keep this to filter posts when they click to view only their posts
    // function filterProducts() {
    //     if (!currentCategory) {
    //         return state.products;
    //     }

    //     return state.products.filter(
    //         (product) => product.category._id === currentCategory
    //     );
    // }

    return (
        <Grid container display="flex" wrap="wrap">
            {posts.map((post) => (
                <PostCard
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    commentCount={post.commentCount}
                    comments={post.comments}
                    createdAt={post.createdAt}
                    description={post.description}
                    picture={post.picture}
                    plantType={post.plantType}
                    username={post.username}
                ></PostCard>
            ))}
        </Grid>
    );
}

export default CardList;
