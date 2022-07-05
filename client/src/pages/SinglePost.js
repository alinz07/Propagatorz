import React, { useEffect, useState } from "react";
import { useStoreContext } from "../../src/utils/globalState";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_POSTS } from "../utils/queries";
import CommentForm from "../components/CommentForm";
import { Grid } from "@mui/material";
import PostCard from "../components/Card";
import UpdateForm from "../components/UpdateForm";
import Auth from "../utils/auth";

function SinglePost() {
    const { id } = useParams();
    const postId = id.substring(1);
    const { loading, data } = useQuery(QUERY_ALL_POSTS);

    const [currentPost, setCurrentPost] = useState("");

    const [state, dispatch] = useStoreContext();

    const currentUser = state.loggedInUser;
    console.log(currentUser);

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
    }, [currentPost, setCurrentPost, postId]);

    return (
        <Grid>
            {data ? (
                <Grid
                    container
                    display="flex"
                    wrap="wrap"
                    justifyContent="center"
                    id="singlepost-container"
                >
                    {Auth.loggedIn && currentUser === currentPost.username && (
                        <Grid item xs={3} id="updateform-container">
                            <UpdateForm postId={currentPost._id} />
                        </Grid>
                    )}
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
                    <Grid item xs={4} id="comment-form-grid">
                        <CommentForm postId={currentPost._id} />
                    </Grid>
                </Grid>
            ) : null}
            {loading ? <Grid>...loading</Grid> : null}
        </Grid>
    );
}

export default SinglePost;
