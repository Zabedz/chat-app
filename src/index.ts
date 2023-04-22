// src/index.ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/schema";
import { resolvers } from "./resolvers/resolvers";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const main = async () => {
    const { url } = await startStandaloneServer(server);
    console.log(`🚀 Server ready at ${url}`);
};

main().catch((error) => {
    console.error("Error starting server:", error);
});
