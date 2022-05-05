import React from "react";
import { Avatar, Stack } from "@mui/material";
import { green, red, yellow, deepPurple } from '@mui/material/colors'

function Footer() {
    return(
        <Stack direction='row' spacing={5}>
            <Avatar sx={{bgcolor: green[500]}}>T</Avatar>
            <Avatar sx={{bgcolor: red[500]}}>Ch</Avatar>
            <Avatar sx={{bgcolor: yellow[500]}}>L</Avatar>
            <Avatar sx={{bgcolor: deepPurple[500]}}>C</Avatar>
        </Stack>
    )
};

export default Footer