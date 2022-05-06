import React from "react";
import { Grid } from "@mui/material";
import Card from "../Card";
import { useStoreContext } from "../../utils/globalState";

function CardList() {
    const [state] = useStoreContext();

    const { posts } = state;

    return (
        <Grid container display="flex" wrap="wrap">
            {posts.map((post) => (
                <Grid item xs={12} md={6} xl={4} key={post._id}>
                    <Card Postdata={post}></Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default CardList;
