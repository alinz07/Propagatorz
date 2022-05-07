import React from "react";
import { Avatar, Stack } from "@mui/material";
import { green, red, yellow, deepPurple } from '@mui/material/colors'

function Footer() {
    return(
        <Stack direction='row' spacing={5}>
            <Avatar sx={{bgcolor: green[500]}} onClick={(e) => {
                e.preventDefault();
                window.location.href='https://github.com/alinz07'
            }}>T</Avatar>
            <Avatar sx={{bgcolor: red[500]}} onClick={(e) => {
                e.preventDefault();
                window.location.href='https://github.com/Chris-McLeod2'}}>Ch</Avatar>
            <Avatar sx={{bgcolor: yellow[500]}} onClick={(e) => {
                e.preventDefault();
                window.location.href='https://github.com/lindseymiller2567'}}>L</Avatar>
            <Avatar sx={{bgcolor: deepPurple[500]}} onClick={(e) => {
                e.preventDefault();
                window.location.href='https://github.com/ColeVibes'}}>C</Avatar>
        </Stack>
    )
};

export default Footer