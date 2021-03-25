const { model, Schema } = require('mongoose');

const postSchema = ({
    body: String,
    userName: String,
    createdAt: String,
    comments:[
        {
            body: String,
            userName: String,
            createdAt: String
        }
    ],
    likes:[
        {
            userName: String,
            createdAt: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
});

const Post = new model("Post", postSchema);

module.exports = Post;