import React, { useEffect, useState } from "react";
import {
    Chip,
    Grid,
    Tooltip,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import { useStoreContext } from "../../utils/globalState";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { DELETE_POST } from "../../utils/mutations";
import { DELETE_A_POST } from "../../utils/actions";
import { useMutation } from "@apollo/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const theme = createTheme({
    palette: {
        primary: {
            main: "#6F4E37",
        },
        secondary: {
            main: "#A7C957",
        },
        info: {
            main: "#BC4749",
        },
    },
});

function PostCard(post) {
    const [state, dispatch] = useStoreContext();

    const [postToDelete, setPostToDelete] = useState("");

    const [deletePost] = useMutation(DELETE_POST);

    useEffect(() => {
        if (!postToDelete) {
            return;
        }
        dispatch({
            type: DELETE_A_POST,
            _id: postToDelete,
        });

        try {
            deletePost({
                variables: { _id: postToDelete },
            });
        } catch (e) {
            console.log(e);
        }
    });

    const deletePostHandler = (e) => {
        if (!e.target.id) {
            const postId = e.target.parentElement.id;
            setPostToDelete(postId);
        } else {
            const postId = e.target.id;
            setPostToDelete(postId);
        }
    };

    const page = window.location.toString();
    let renderDelIcon = true;

    if (page.includes("singlePost")) {
        renderDelIcon = false;
    }

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
        <Grid item xs={12} sm={5} md={3} lg={2} p={0} m={1}>
            <Card id="react-card">
                <CardMedia
                    component="img"
                    alt={plantType}
                    height="200"
                    image={picture}
                    className="cardPic"
                    id="card-media"
                />

                <CardContent>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        m={0}
                    >
                        <Grid item container id="card-section-one" pb={3}>
                            <Grid id="card-title" p={2} pb={0} item xs={12}>
                                {title}
                            </Grid>
                            <Grid
                                fontSize="subtitle1"
                                pt={1}
                                pb={1}
                                item
                                xs={12}
                            >
                                by {username} on {createdAt}
                            </Grid>
                        </Grid>
                        <Grid item container id="card-section-two" p={0}>
                            <Grid
                                item
                                xs={12}
                                fontSize="h6.fontSize"
                                id="plant-type"
                                fontWeight="600"
                            >
                                Species: {plantType}
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                fontSize="subtitle1.fontSize"
                                id="post-description"
                            >
                                {description}
                            </Grid>

                            {username === state.loggedInUser && renderDelIcon && (
                                <Grid
                                    item
                                    xs={12}
                                    container
                                    alignItems="center"
                                    justifyContent="center"
                                    id="delete-container"
                                >
                                    <Grid item xs={4} p={0}>
                                        <ThemeProvider theme={theme}>
                                            <Tooltip title="Delete my post">
                                                <IconButton
                                                    variant="contained"
                                                    className="delBtn"
                                                    color="secondary"
                                                    id={id}
                                                    onClick={deletePostHandler}
                                                >
                                                    <DeleteIcon id={id} />
                                                </IconButton>
                                            </Tooltip>
                                        </ThemeProvider>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                        <Grid
                            item
                            container
                            id="card-section-three"
                            fontSize="body2"
                        >
                            <Grid
                                pt={2}
                                item
                                xs={12}
                                id="comment-count"
                                fontWeight="medium"
                            >
                                {commentCount} comments
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                justifyContent="center"
                            >
                                {comments &&
                                    comments.map((comment) => (
                                        <Grid
                                            id="comment-body"
                                            item
                                            key={comment._id}
                                            p={1}
                                        >
                                            {comment.commentBody} -
                                            {comment.username} on{" "}
                                            {comment.createdAt}
                                        </Grid>
                                    ))}
                                {renderDelIcon && state.loggedInUser && (
                                    <Grid item p={2}>
                                        <ThemeProvider theme={theme}>
                                            <Tooltip title="Leave a lovely comment">
                                                <Link
                                                    to={{
                                                        pathname: `/singlePost/:${id}`,
                                                    }}
                                                >
                                                    <Chip
                                                        label="Comment/Update your post"
                                                        color="primary"
                                                        id="chip"
                                                    />
                                                </Link>
                                            </Tooltip>
                                        </ThemeProvider>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PostCard;
