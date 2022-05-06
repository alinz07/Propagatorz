import React from "react";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import LinkIcon from "@mui/icons-material/Link";

function PostCard(post) {
    return (
        <Card width={300} id="react-card">
            <CardMedia
                component="img"
                alt={post.plantType}
                height="200"
                // image={require(`../../assets/homepages/${post.picture}`)}
            />
            <CardContent>
                <Grid container alignItems="center">
                    <Grid fontSize="h4.fontSize" p={2} pb={1} item xs={12}>
                        {post.title}
                    </Grid>
                    <Grid fontSize="h6.fontSize" p={2} pb={1} item xs={12}>
                        {post.username}
                    </Grid>
                    <Grid fontSize="h6.fontSize" p={2} pb={1} item xs={12}>
                        {post.createdAt}
                    </Grid>
                    {/* <Grid p={2} pt={2} item xs={6}>
                                    <Tooltip title="Go to link">
                                        <a
                                            id="proj-link"
                                            href={project.aitchref}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <LinkIcon /> Deployed App
                                        </a>
                                    </Tooltip>
                                </Grid> */}

                    {/* <Grid p={2} pt={2} item xs={6}>
                                    <Tooltip title="Go to link">
                                        <a id="proj-link" href={project.repo}>
                                            <LinkIcon /> GitHub Repo
                                        </a>
                                    </Tooltip>
                                </Grid> */}
                    <Grid
                        mt={5}
                        p={2}
                        item
                        xs={12}
                        fontSize="h5.fontSize"
                        id="plant-type"
                    >
                        {post.plantType}
                    </Grid>
                    {/* <Grid
                                    pt={1}
                                    item
                                    xs={12}
                                    fontSize="h6.fontSize"
                                >
                                    {project.tech}
                                </Grid> */}
                    {/* <Grid
                                    mt={5}
                                    p={2}
                                    item
                                    xs={12}
                                    fontSize="h5.fontSize"
                                    id="description"
                                >
                                    Motivation and Contribution
                                </Grid> */}
                    <Grid pt={1} item xs={12} fontSize="h6.fontSize">
                        {post.description}
                    </Grid>
                    <Grid pt={1} item xs={12} fontSize="h6.fontSize">
                        {post.commentCount}
                    </Grid>
                    <Grid pt={1} item xs={12} fontSize="h6.fontSize">
                        {post.comments}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

export default PostCard;
