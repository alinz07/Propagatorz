import React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

function PostCard(post) {
    const {
        title,
        commentCount,
        comments,
        createdAt,
        description,
        picture,
        plantType,
        username,
    } = post;
    console.log(title);

    return (
        <Grid item xs={12} md={6} xl={4}>
            <Card width={300} id="react-card">
                <CardMedia
                    component="img"
                    alt={plantType}
                    height="200"
                    image={picture}
                    // image={require(`../../assets/homepages/${picture}`)}
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
