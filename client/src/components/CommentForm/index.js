import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_COMMENT } from '../../utils/mutations';

const CommentForm = ({ postId }) => {

    const [commentBody, setBody] = useState('');
    const [addComment, { error }] = useMutation(ADD_COMMENT)

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            await addComment({
                variables: { postId, commentBody }
            })
            setBody('');
        } catch (e) {
            console.error(e);
        };
    };

    return (
        <div>
            {error && <div>Something went wrong...</div>}

            <form>
                <textarea
                    placeholder="Leave a comment"
                    value={commentBody}
                    onChange={(event) => setBody(event.target.value)}
                ></textarea>

                <button type="submit" onClick={handleFormSubmit}>
                    Submit
                </button>
            </form>

        </div >
    )
};

export default CommentForm;