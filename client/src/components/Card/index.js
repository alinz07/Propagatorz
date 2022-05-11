import React, { useEffect, useState } from "react";
import { Grid, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
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
            main: "#39302B",
        },
        secondary: {
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
        <Grid item xs={12} sm={5} md={3} lg={2} p={0} m={3}>
            <Card id="react-card">
                <Tooltip title="click image to view post details and leave a comment">
                    <Link to={{ pathname: `/singlePost/:${id}` }}>
                        <CardMedia
                            component="img"
                            alt={plantType}
                            height="200"
                            image={picture}
                            className="cardPic"
                        />
                    </Link>
                </Tooltip>

                <CardContent>
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid
                            text-align="center"
                            fontSize="h5.fontSize"
                            p={2}
                            pb={1}
                            item
                            xs={12}
                        >
                            {title}
                        </Grid>
                        <Grid fontSize="h6.fontSize" p={2} pb={1} item xs={12}>
                            {username}
                        </Grid>
                        <Grid item xs={12} container alignItems="center">
                            <Grid item xs={8}>
                                {createdAt}
                            </Grid>
                            {username === state.loggedInUser && renderDelIcon && (
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
                            )}
                        </Grid>
                        <Grid mt={5} p={2} item xs={12} fontSize="h5.fontSize">
                            <div>{plantType}</div>
                        </Grid>
                        <Grid pt={1} item xs={12} fontSize="h6.fontSize">
                            <div>{description}</div>
                        </Grid>
                        <Grid pt={1} item xs={12}>
                            <div>{commentCount} comments</div>
                        </Grid>
                        <Grid pt={1} item xs={12}>
                            {comments &&
                                comments.map((comment) => (
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
