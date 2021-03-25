const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');
const likesResolvers = require('./Likes');

module.exports = {
    Post: {
        likeCount(parent){
            console.log(parent);
            return parent.likes.length;
        },
        commentCount(parent){
            console.log(parent);
            return parent.comments.length;
        }
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation
    }
};