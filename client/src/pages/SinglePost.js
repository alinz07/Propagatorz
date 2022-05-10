import React, { useEffect, useState } from 'react';
//import {Link, useParams} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { UPDATE_POST } from '../utils/mutations';
import { QUERY_ONE_POST } from '../utils/queries';
import { useStoreContext } from '../utils/globalState';
import CommentForm from '../components/CommentForm';
import { Grid } from "@mui/material";
import PostCard from "../Card";

const SinglePost = ({ postId }) => {
    const [state, dispatch] = useStoreContext();

    const { loading, data } = useQuery(QUERY_ONE_POST);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_POST,
                post: data.post
            });
        }
    }, [data, loading, disaptch]);

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
            <CommentForm />
        </Grid>
    );
}

export default SinglePost();