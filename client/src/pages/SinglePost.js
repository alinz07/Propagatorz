import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_POSTS } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import { Grid } from "@mui/material";
import PostCard from "../components/Card";

function SinglePost() {
    const { id } = useParams();
    const postId = id.substring(1);
    const { loading, data } = useQuery(QUERY_ALL_POSTS);

    const [currentPost, setCurrentPost] = useState("");

    useEffect(() => {
        if (!data) {
            return;
        }
        setCurrentPost(data.posts.find((post) => post._id === postId));
    }, [data, postId]);

    useEffect(() => {
        if (!currentPost) {
            return;
        }
        console.log(currentPost.comments);
    }, [currentPost, setCurrentPost]);

    return (
        <Grid>
            {data ? (
                <Grid
                    container
                    display="flex"
                    wrap="wrap"
                    justifyContent="center"
                >
                    <PostCard
                        id={currentPost._id}
                        title={currentPost.title}
                        commentCount={currentPost.commentCount}
                        comments={currentPost.comments}
                        createdAt={currentPost.createdAt}
                        description={currentPost.description}
                        picture={currentPost.picture}
                        plantType={currentPost.plantType}
                        username={currentPost.username}
                    ></PostCard>
                    <CommentForm />
                </Grid>
            ) : null}
            {loading ? <Grid>...loading</Grid> : null}
        </Grid>
    );
}

export default SinglePost;
