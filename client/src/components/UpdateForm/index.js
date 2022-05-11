import React from "react";
import { Grid } from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../../utils/mutations";
import { useState } from "react";
import { useStoreContext } from "../../utils/globalState";

function UpdateForm(post) {
    const [state, dispatch] = useStoreContext();

    const { postId } = post;

    const [postBody, setPostBody] = useState({
        title: "",
        plantType: "",
        description: "",
    });
    const [updatePost, { error }] = useMutation(UPDATE_POST);

    // const handleFormSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         await addComment({
    //             variables: { postId, commentBody },
    //         });
    //         setBody("");
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    // const handleChange = (event) => {
    //     setBody(event.target.value);
    // };

    return (
        <Grid>
            hello
            {/* {error && <div>Something went wrong...</div>}
            <form>
                <textarea
                    placeholder="Leave a comment"
                    value={commentBody}
                    onChange={handleChange}
                ></textarea>

                <button type="submit" onClick={handleFormSubmit}>
                    Submit
                </button>
            </form> */}
        </Grid>
    );
}

export default UpdateForm;
