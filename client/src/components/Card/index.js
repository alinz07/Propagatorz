import React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useStoreContext } from "../../utils/globalState";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { DELETE_POST } from "../../utils/mutations";
import { DELETE_A_POST } from "../../utils/actions";
import { useMutation } from "@apollo/client";

function PostCard(post) {
    const [state, dispatch] = useStoreContext();

    const [deletePost] = useMutation(DELETE_POST);

    const deletePostHandler = async (e) => {
        const postId = e.target.id;

        console.log(typeof postId);
        //answer is string
        deleteStatePost(postId);

        try {
            await deletePost({
                variables: { _id: postId },
            });
            deleteStatePost(postId);
        } catch (e) {
            console.log(e);
        }
    };

    const deleteStatePost = (postId) => {
        dispatch({
            type: DELETE_A_POST,
            _id: postId,
        });
    };

    const {
        id,
        title,
        commentCount,
        comments,
        createdAt,
        description,
        picture,
        plantType,
        username,
    } = post;

    return (
        <Grid item xs={12} md={6} xl={4}>
            <Card key={id} width={300} id="react-card">
                <CardMedia
                    component="img"
                    alt={plantType}
                    height="200"
                    image={picture}
                />
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid fontSize="h4.fontSize" p={2} pb={1} item xs={12}>
                            <div>{title}</div>
                        </Grid>
                        <Grid fontSize="h6.fontSize" p={2} pb={1} item xs={12}>
                            <div>{username}</div>
                        </Grid>
                        <Grid fontSize="h6.fontSize" p={2} pb={1} item xs={12}>
                            <div>{createdAt}</div>
                            {username === state.loggedInUser && (
                                <Button
                                    variant="contained"
                                    startIcon={<DeleteIcon />}
                                    id={id}
                                    onClick={deletePostHandler}
                                ></Button>
                            )}
                        </Grid>
                        <Grid mt={5} p={2} item xs={12} fontSize="h5.fontSize">
                            <div>{plantType}</div>
                        </Grid>
                        <Grid pt={1} item xs={12} fontSize="h6.fontSize">
                            <div>{description}</div>
                        </Grid>
                        <Grid pt={1} item xs={12} fontSize="h6.fontSize">
                            <div>{commentCount} comments</div>
                        </Grid>
                        <Grid pt={1} item xs={12} fontSize="h6.fontSize">
                            {comments.map((comment) => (
                                <div key={comment._id}>
                                    <p>{comment.commentBody}</p>
                                    <span>
                                        {comment.username} on{" "}
                                        {comment.createdAt}
                                    </span>
                                </div>
                            ))}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PostCard;
