import React from 'react';

import { gql, useQuery } from '@apollo/client';
//import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../../components/PostCard';

const Home = () => {
    const {loading,error,data} = useQuery(FETCH_POSTS_QUERY);
    if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
    return (
        <Grid columns={3} >
            <Grid.Row className='page-title'>
                <h1>Recent posts</h1>
            </Grid.Row>
        <Grid.Row>
         { data && data.getPosts.map(post => (
                    <Grid.Column key={post.id} style={{marginBottom: 20}}>
                        <PostCard post = {post} />
                    </Grid.Column>
                ))
        }
        </Grid.Row>
        </ Grid>
    )
};

const FETCH_POSTS_QUERY = gql`
   {
  getPosts{
    body
    id
    createdAt
    userName
    likeCount
    commentCount
    comments{
      id
      body
      userName
    }
    likes{
      id
      userName
    }
  }
}
`;

export default Home;
