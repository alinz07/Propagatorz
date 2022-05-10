import React, { useEffect, useState} from 'react';
import { Card } from '@mui/material';;
import {Link, useParams } from 'react-router-dom';
import { useQuery, userQuery } from '@apollo/client';
import { QUERY_ALL_POSTS } from '../utils/queries';
import { useStoreContext } from '../utils/globalState';
import { UPDATE_POSTS } from '../utils/actions';



const SinglePost = () => {

    const [state, dispatch] = useStoreContext();

    const { posts } = state;

    const { id } = useParams();

    const { currentPost, setCurrentPost } = useState({});

    const { loading, data } = useQuery(QUERY_ALL_POSTS);

    useEffect(() => {
        if (posts.length) {
            setCurrentPost(posts.find((post) => post._id === id));
        } else if(data) {
            dispatch({
                type: UPDATE_POSTS,
                posts: data.posts,
            });
            data.posts.forEach((post) => {

            })
        }
    })

    
    return (
        <>
          {currentPost ? (
              <div className='container my-1'>
                  <Link to='/'>Return to Posts Page</Link>
              </div>
          ) : null}
          <Card/>
        </>
    );
};