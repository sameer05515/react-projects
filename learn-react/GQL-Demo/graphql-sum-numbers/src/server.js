const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLFloat } = require('graphql');
const cors = require('cors'); // Import the 'cors' library

const app = express();
app.use(cors()); // Enable CORS for all routes

// Define the GraphQL schema
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      sum: {
        type: GraphQLFloat,
        args: {
          number1: { type: GraphQLFloat },
          number2: { type: GraphQLFloat },
        },
        resolve: (parent, args) => {
          const { number1, number2 } = args;
          if (isNaN(number1) || isNaN(number2)) {
            throw new Error('Invalid input. Please provide valid numbers.');
          }
          return number1 + number2;
        },
      },
    },
  }),
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for easy testing in the browser
  })
);

app.listen(4000, () => {
  console.log('GraphQL server is running on http://localhost:4000/graphql');
});
