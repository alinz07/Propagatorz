import React, { useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../../utils/mutations";
import { useState } from "react";
import { useStoreContext } from "../../utils/globalState";
import SendIcon from "@mui/icons-material/Send";

function UpdateForm(post) {
    const [state, dispatch] = useStoreContext();

    const { postId } = post;

    const [postBody, setPostBody] = useState({
        postId: "",
        title: "",
        plantType: "",
        description: "",
    });
    const [updatePost, { error }] = useMutation(UPDATE_POST);

    useEffect(() => {
        setPostBody({ ...postBody, postId: postId });
    }, [postId]);

    const handleSubmit = async (event) => {
        console.log(postBody);
        event.preventDefault();
        if (postBody.postId) {
            console.log(postBody);
            try {
                await updatePost({
                    variables: { ...postBody },
                });
                setPostBody("");
            } catch (e) {
                console.error(e);
            }
        } else {
            setPostBody(postId);
        }
    };

    const handleChange = (event) => {
        setPostBody({ ...postBody, [event.target.name]: event.target.value });
        console.log("handling change");
    };

    return (
        <Grid item xs={12} container>
            <Grid item>
                <form id="contact-form" onSubmit={handleSubmit}>
                    <div>
                        All fields optional; Only update the fields you need to,
                        fellow greenthumb!
                    </div>
                    <Grid
                        container
                        justifyContent="center"
                        id="form-divs-container"
                    >
                        <Grid item xs={12} p={2}>
                            <TextField
                                p={1}
                                id="form-field"
                                label="Updated Title"
                                name="title"
                                variant="filled"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="form-field"
                                name="plantType"
                                label="Updated plantType"
                                variant="filled"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} p={2}>
                            <TextField
                                id="form-field"
                                label="Updated Post Text"
                                name="description"
                                multiline
                                rows={5}
                                variant="filled"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} p={2} textAlign="center">
                            <Button
                                startIcon={<SendIcon />}
                                variant="contained"
                                type="submit"
                                id="update-btn"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default UpdateForm;
