import React from "react";
import { Grid } from "@mui/material";
import { useStoreContext } from "../../utils/globalState";
import PostCard from "../Card";

function CardList() {
    const [state] = useStoreContext();

    const { posts } = state;

    return (
        <Grid container display="flex" wrap="wrap">
            {posts.map((post) => (
                <Grid item xs={12} md={6} xl={4} key={post._id}>
                    <PostCard Postdata={post}></PostCard>
                </Grid>
            ))}
        </Grid>
    );
}

export default CardList;
