const Post  = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');
const { UserInputError } = require('apollo-server');

module.exports = {
    Mutation: {
        async createLike(_,{ postId }, context){
            const { userName } = checkAuth(context);
            const post =  await Post.findById(postId);
            if(post){
                if(post.likes.find(like => like.userName === userName)){
                //post already liked unlike then
                post.likes.filter(like => like.userName !== userName);
            }else{
                //not liked yet
                post.likes.push({
                    userName,
                    createdAt: new Date().toISOString()
                })
            }
            await post.save();
            return post;
        }else throw new UserInputError('Post not found');
        }
    }
}