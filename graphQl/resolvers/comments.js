const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');
const { UserInputError, AuthenticationError } = require('apollo-server');

module.exports = {
    Mutation: {
        async createComment(_,{ postId,body },context){
            const { userName } = checkAuth(context);
            if(body.trim === '')throw new UserInputError('comment not valid');

            const post = await Post.findById(postId);
                if(post){
                   post.comments.unshift({
                       body,
                       userName,
                       createdAt: new Date().toISOString()
                   })  
                   await post.save();
                   return post;
                }else throw new UserInputError('Post not found');
        },
        async deleteComment(_,{ postId, commentId },context){
            const { userName } = checkAuth(context);
            const post = await Post.findById(postId);
            //const comment = post.comments.findById(commentId);
            if(post){
                const commentIndex = post.comments.findIndex(f => f.id === commentId);
                if(post.comments[commentIndex].userName === userName){
                    post.comments.splice(commentIndex,1);
                    await post.save();
                    return post;
                }else{
                    throw new AuthenticationError('you cannot delete this comment since this isnt your property');
                }
            }else{
                throw new UserInputError('Post doesnt exist');
            }
        }
    }
}