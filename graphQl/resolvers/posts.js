const Post = require('../../models/Post');
const { Mutation } = require('./users');
const checkAuth = require('../../utils/checkAuth');
const { AuthenticationError } = require('apollo-server');

module.exports = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            }
            catch(err){
                throw new Error(err);
            }
        },
        async getPost(_,{ postId }){
            try {
                const post = await Post.findById(postId);
                if(post){
                    return post;
                }else {
                    throw new Error('Post not found')
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context ){
            const user = checkAuth(context);
            console.log(user);

            const newPost = new Post({
                body,
                user: user.id,
                userName: user.userName,
                createdAt: new Date().toISOString() 
            })
            const post = await newPost.save();

            return post;
        },
        async deletePost(_,{ postId }, context){
            const user = checkAuth(context);
            //console.log(user);
            const deletePost = await Post.findById(postId);
                console.log(deletePost);
            try { 
                if(user.userName === deletePost.userName){
                    await deletePost.delete();
                    return "post deleted successfully";
                }else{
                    throw new AuthenticationError("Action not allowed");
                }
                
            } catch (err) {
                throw new Error(err);
            }

        }
    }
};