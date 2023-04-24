import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/schema';
import { resolvers } from './resolvers/resolvers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// CORS configuration
const corsOptions = {
  origin: '*',
  credentials: true,
};

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

// Apollo Server initialization
const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  const { url } = await startStandaloneServer(server);
  server.applyMiddleware({ cors: corsOptions });
  console.log(`🚀 Server ready at ${url}`);
};

main().catch((error) => {
  console.error('Error starting server:', error);
});
