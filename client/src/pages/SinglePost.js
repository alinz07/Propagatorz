import React, { useEffect, useState } from 'react';
//import {Link, useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { UPDATE_POST } from '../utils/mutations';
import { QUERY_ONE_POST } from '../utils/queries';
import { useStoreContext } from '../utils/globalState';
import CommentForm from '../components/CommentForm';
import PostCard from '../components/Card';
import { Grid } from "@mui/material";

const SinglePost = () => {
    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_ONE_POST);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_POST,
                post: data.post
            });
        }
    }, [data, loading, dispatch]);

    // function filterPosts() {
    //     if (Auth.loggedIn() && state.postFilter && state.loggedInUser)
    //         return state.posts.filter(
    //             (post) => post.username === state.loggedInUser
    //         );
    //     else {
    //         return state.posts;
    //     }
    // }

    return (
        <Grid container display="flex" wrap="wrap" justifyContent="center">
            {/* {state.post.map((post) => (
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
            ))} */}
            <CommentForm />
        </Grid>
    );
}

export default SinglePost();
