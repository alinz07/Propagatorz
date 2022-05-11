import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ADD_COMMENT } from "../../utils/mutations";
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
        <div>
            {error && <div>Something went wrong...</div>}

            <form>
                <textarea
                    placeholder="Leave a comment"
                    value={commentBody}
                    onChange={handleChange}
                ></textarea>

                <button type="submit" onClick={handleFormSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
