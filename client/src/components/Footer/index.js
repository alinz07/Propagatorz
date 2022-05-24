import React from "react";
import { Avatar, Stack, Tooltip, Grid } from "@mui/material";

function Footer() {
    return (
        <footer>
            <Grid container columnSpacing={5} display="flex" wrap="wrap">
                <Grid item xs={12} sm={6} md={9}>
                    <p>Copyright 2022</p>
                </Grid>

                <Grid item xs={12} sm={6} md={3} justifyContent="center">
                    <Stack direction="row" spacing={1}>
                        <Grid item xs={3}>
                            <Tooltip title="Visit Tony's GitHub">
                                <Avatar
                                    id="avatar"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href =
                                            "https://github.com/alinz07";
                                    }}
                                >
                                    T
                                </Avatar>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={3}>
                            <Tooltip title="Visit Chris's GitHub">
                                <Avatar
                                    id="avatar"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href =
                                            "https://github.com/Chris-McLeod2";
                                    }}
                                >
                                    Ch
                                </Avatar>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={3}>
                            <Tooltip title="Visit Lindsey's GitHub">
                                <Avatar
                                    id="avatar"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href =
                                            "https://github.com/lindseymiller2567";
                                    }}
                                >
                                    L
                                </Avatar>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={3}>
                            <Tooltip title="Visit Cole's GitHub">
                                <Avatar
                                    id="avatar"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href =
                                            "https://github.com/ColeVibes";
                                    }}
                                >
                                    C
                                </Avatar>
                            </Tooltip>
                        </Grid>
                    </Stack>
                </Grid>
            </Grid>
        </footer>
    );
}

export default Footer;
