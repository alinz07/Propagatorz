import React from "react";
import { Avatar, Stack } from "@mui/material";
import { green } from '@mui/material/colors';
import { Grid } from "@mui/material";

function Footer() {
    return (
        <footer>
            <Grid container>
                <Grid item xs={9}>
                    <p>Copyright 2022</p>
                </Grid>

                <Grid item xs={3}>
                    <div>
                        <Stack direction='row' spacing={5}>
                            <Avatar sx={{ bgcolor: green[500] }} onClick={(e) => {
                                e.preventDefault();
                                window.location.href = 'https://github.com/alinz07'
                            }}>T</Avatar>
                            <Avatar sx={{ bgcolor: green[500] }} onClick={(e) => {
                                e.preventDefault();
                                window.location.href = 'https://github.com/Chris-McLeod2'
                            }}>Ch</Avatar>
                            <Avatar sx={{ bgcolor: green[500] }} onClick={(e) => {
                                e.preventDefault();
                                window.location.href = 'https://github.com/lindseymiller2567'
                            }}>L</Avatar>
                            <Avatar sx={{ bgcolor: green[500] }} onClick={(e) => {
                                e.preventDefault();
                                window.location.href = 'https://github.com/ColeVibes'
                            }}>C</Avatar>
                        </Stack>
                    </div>
                </Grid>

            </Grid>
        </footer>
    )
};

export default Footer