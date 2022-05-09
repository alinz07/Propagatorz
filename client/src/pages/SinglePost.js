import React from 'react';
import { Card } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
    UPDATE_POST,
    DELETE_POST,
    DELETE_COMMENT,
    ADD_COMMENT,
    UPDATE_COMMENT
} from '../utils/mutations';
import { QUERY_ALL_POSTS } from '../utils/queries';



const SinglePost = () => {

    
    return (
        <div className='container'>
            <Card />
        </div>
    );
};