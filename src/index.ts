import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { typeDefs } from './schema/schema';
import { resolvers } from './resolvers/resolvers';

// MongoDB initialization
dotenv.config();
const MONGODB_URI: string = process.env.MONGO_DB_URL as string;

if (!MONGODB_URI) {
  throw new Error('MONGO_DB_URL is not set in the environment variables.');
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Server initialization
const app = express();
const httpServer = createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });
let serverCleanup: ReturnType<typeof useServer>;

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const main = async () => {
  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server)
  );

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  serverCleanup = useServer({ schema }, wsServer);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${
          process.env.PORT || 4000
        }/graphql`
      );
      resolve();
    })
  );
};

main();
