// src/index.ts
import express from "express";
import {ApolloServer} from "apollo-server-express";
import {createServer} from "http";
import {typeDefs} from "./schema/schema";
import {resolvers} from "./resolvers/resolvers";
import {execute, subscribe} from "graphql";
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';


import {SubscriptionServer} from "subscriptions-transport-ws";

const app = express();

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
            settings: {
                "request.credentials": "include",
            },
        }),
    ],
});

server.applyMiddleware({app});

const httpServer = createServer(app);

SubscriptionServer.create(
    {
        schema,
        execute,
        subscribe,
    },
    {
        server: httpServer,
        path: server.graphqlPath,
    }
);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`Subscriptions ready at ws://localhost:${PORT}${server.graphqlPath}`);
});
