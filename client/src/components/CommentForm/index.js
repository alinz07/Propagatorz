import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ADD_COMMENT } from "../../utils/mutations";
import { Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
// import { useStoreContext } from "../../utils/globalState";

const CommentForm = ({ postId }) => {
    // const [state, dispatch] = useStoreContext();

    const [commentBody, setBody] = useState("");
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await addComment({
                variables: { postId, commentBody },
            });
            setBody("");
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (event) => {
        setBody(event.target.value);
    };

    return (
        <Grid textAlign="center">
            {error && <div>Something went wrong...</div>}

            <form>
                <textarea
                    placeholder="Leave a comment"
                    value={commentBody}
                    onChange={handleChange}
                    id="comment-textarea"
                ></textarea>

                <Button
                    startIcon={<SendIcon />}
                    variant="contained"
                    type="submit"
                    id="update-btn"
                    onClick={handleFormSubmit}
                >
                    Submit
                </Button>
            </form>
        </Grid>
    );
};

export default CommentForm;
