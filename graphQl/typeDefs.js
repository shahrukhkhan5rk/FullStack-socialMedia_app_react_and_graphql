const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        userName: String!
        comments: [comment]!
        likes: [like]!
        likeCount: Int!
        commentCount: Int!
    }
    type User{
        id: ID!
        email: String!
        token: String!
        userName: String!
        createdAt: String!
    }
    type comment{
        id: ID!
        body: String!
        userName: String!
        createdAt: String!
    }
    type like{
        id:ID!
        createdAt: String,
        userName: String
    }
    input RegisterInput{
        userName: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(userName: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId:String!,body: String!): Post!
        deleteComment(postId: ID!,commentId: ID!): Post!
        createLike(postId:ID!): Post!
    }
`;