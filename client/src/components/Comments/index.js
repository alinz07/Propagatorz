import React from 'react';

const Comment = ({ comments }) => {
    return (
        <div>
            <div>
                <span>Comments</span>
            </div>
            <div>
                {comments &&
                    comments.map(comment => (
                        <p key={comment._id}>
                            Feedback from {comment.username} on {comment.createdAt} <br />
                            {comment.commentBody}
                        </p>
                    ))}
            </div>
        </div>
    )
};

export default Comment;