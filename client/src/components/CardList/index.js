import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useStoreContext } from "../../utils/globalState";
import PostCard from "../Card";
import { QUERY_ALL_POSTS } from "../../utils/queries";
import { UPDATE_POSTS } from "../../utils/actions";
import Auth from "../../utils/auth";

function CardList() {
    const [state, dispatch] = useStoreContext();

    const { data } = useQuery(QUERY_ALL_POSTS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_POSTS,
                posts: data.posts,
            });
        }
    }, [data]);

    function filterPosts() {
        if (Auth.loggedIn() && state.postFilter && state.loggedInUser)
            return state.posts.filter(
                (post) => post.username === state.loggedInUser
            );
        else {
            return state.posts;
        }
    }

    return (
        <Grid container display="flex" wrap="wrap" justifyContent="center">
            {filterPosts().map((post) => (
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
