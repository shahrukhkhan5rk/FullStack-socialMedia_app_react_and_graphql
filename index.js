const { ApolloServer }  = require('apollo-server');
const mongoose = require('mongoose');
const { MONGODB } = require('./config.js');

const typeDefs = require('./graphQl/typeDefs');
const resolvers = require('./graphQl/resolvers');



const server =  new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> {
    console.log("MongoDB connected!!");
    return server.listen({port: 5000});
})
.then(res => {
    console.log(`server running at ${res.url}`)
});
