import React from "react";
import { Avatar, Stack } from "@mui/material";
import { green } from '@mui/material/colors';
import { Grid } from "@mui/material";
import { left } from "@popperjs/core";

function Footer() {
    return (
        <footer>
            <Grid container columnSpacing={5} display="flex" wrap="wrap">
                <Grid item xs={12} sm={6} md={9}>
                    <p>Copyright 2022</p>
                </Grid>

                <Grid item xs={12} sm={6} md={3} justifyContent="center">
                        <Stack direction='row' spacing={1}>

                            <Grid item xs={3}>
                                <Avatar sx={{ bgcolor: green[500] }} onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'https://github.com/alinz07'
                                }}>T</Avatar>
                            </Grid>

                            <Grid item xs={3}>
                                <Avatar sx={{ bgcolor: green[500] }} onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'https://github.com/Chris-McLeod2'
                                }}>Ch</Avatar>
                            </Grid>

                            <Grid item xs={3}>
                                <Avatar sx={{ bgcolor: green[500] }} onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'https://github.com/lindseymiller2567'
                                }}>L</Avatar>
                            </Grid>

                            <Grid item xs={3}>
                                <Avatar sx={{ bgcolor: green[500] }} onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = 'https://github.com/ColeVibes'
                                }}>C</Avatar>
                            </Grid>

                        </Stack>
                </Grid>

            </Grid >
        </footer >
    )
};

export default Footer